const COMMENT_PAGE_SIZE = 10;
const MEME_PAGE_SIZE = 15;

// user = { userId, username }
const baseMemeQuery = (psql, user) => {
  let query = psql('memes')
    .select([
      'memes.meme_id as memeId',
      'memes.user_id as userId',
      'memes.title as title',
      'memes.cloudinary_url as cloudinaryUrl',
      'memes.date_created as dateCreated',
      'author.username as username',
      'counted_comments.comment_count as commentCount',
      'counted_up_votes.up_votes as upVotes',
      'counted_down_votes.down_votes as downVotes',
    ])
    .leftJoin(
      psql('users')
        .select(['user_id', 'username'])
        .as('author'),
      'memes.user_id', '=', 'author.user_id',
    ).leftJoin(
      psql('comments')
        .select(['meme_id'])
        .groupBy('meme_id')
        .count('meme_id as comment_count')
        .as('counted_comments'),
      'memes.meme_id', '=', 'counted_comments.meme_id',
    )
    .leftJoin(
      psql('votes')
        .select(['meme_id'])
        .where({ type: 'up' })
        .groupBy('meme_id')
        .count('meme_id as up_votes')
        .as('counted_up_votes'),
      'memes.meme_id', '=', 'counted_up_votes.meme_id',
    )
    .leftJoin(
      psql('votes')
        .select(['meme_id'])
        .where({ type: 'down' })
        .groupBy('meme_id')
        .count('meme_id as down_votes')
        .as('counted_down_votes'),
      'memes.meme_id', '=', 'counted_down_votes.meme_id',
    )
    .clone();

  if (user) {
    query = query.select(['viewer_vote.userVote'])
      .leftJoin(
        psql('votes')
          .select(['meme_id', 'type as userVote'])
          .where({ user_id: user.userId })
          .as('viewer_vote'),
        'memes.meme_id', '=', 'viewer_vote.meme_id',
      ).clone();
  }

  return query;
};

module.exports = psql => ({

  // memeData = { title, cloudinaryUrl }
  // user = { userId, username }
  // returns { isSuccessful, value }
  saveMeme: async (memeData, user) => {
    try {
      const newMeme = await psql('memes')
        .insert({
          user_id: user.userId,
          title: memeData.title,
          cloudinary_url: memeData.cloudinaryUrl,
        }).returning([
          'meme_id as memeId',
          'user_id as userId',
          'title',
          'cloudinary_url as cloudinaryUrl',
          'date_created as dateCreated',
        ]);

      return {
        isSuccessful: true,
        value: newMeme[0],
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to save meme data',
      };
    }
  },

  // voteData = { memeId, voteType }
  // user = { userId, username }
  // returns { isSuccessful, value }
  addVote: async (voteData, user) => {
    try {
      const meme = await psql('memes')
        .where({ meme_id: voteData.memeId });

      if (meme.length <= 0) {
        return {
          isSuccessful: false,
          value: 'meme with that id does not exist',
        };
      }

      const previousVote = await psql('votes')
        .where('user_id', user.userId)
        .andWhere('meme_id', voteData.memeId)
        .first();

      if (previousVote) {
        // if user voted same type on this meme before, do nothing
        if (previousVote.type === voteData.voteType) {
          return {
            isSuccessful: true,
            value: 'idempotent vote',
          };
        }
        // else remove old vote
        await psql('votes')
          .where('user_id', user.userId)
          .andWhere('meme_id', voteData.memeId)
          .del();
      }
      if (voteData.voteType !== null) {
        const newVote = await psql('votes')
          .insert({
            user_id: user.userId,
            meme_id: voteData.memeId,
            type: voteData.voteType,
          })
          .returning([
            'vote_id as voteId',
            'user_id as userId',
            'meme_id as memeId',
            'type',
            'date_created as dateCreated',
          ]);
        return {
          isSuccessful: true,
          value: newVote[0],
        };
      }
      return {
        isSuccessful: true,
        value: 'removed vote',
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to add vote',
      };
    }
  },

  // commentData = { memeId, text }
  // user = { userId, username }
  // returns { isSuccessful, value }
  addComment: async (commentData, user) => {
    try {
      const meme = await psql('memes')
        .where({ meme_id: commentData.memeId });

      if (meme.length <= 0) {
        return {
          isSuccessful: false,
          value: 'meme with that id does not exist',
        };
      }

      const newComment = await psql('comments')
        .insert({
          user_id: user.userId,
          meme_id: commentData.memeId,
          text: commentData.text,
        }).returning([
          'comment_id as commentId',
          'meme_id as memeId',
          'user_id as userId',
          'text',
          'date_created as dateCreated',
        ]);

      // need to retrieve the username of the user making the comment
      const username = await psql('users')
        .where('user_id', '=', newComment[0].userId)
        .select('username').first();
      newComment[0].username = username.username;

      return {
        isSuccessful: true,
        value: newComment[0],
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to add comment',
      };
    }
  },

  getMeme: async (memeId, user) => {
    try {
      const meme = await baseMemeQuery(psql, user)
        .where({ 'memes.meme_id': memeId })
        .first();

      if (meme) {
        if (!meme.userVote) {
          meme.userVote = null;
        }
        return {
          isSuccessful: true,
          value: meme,
        };
      }
      return {
        isSuccessful: false,
        value: 'meme not found',
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to retrieve meme',
      };
    }
  },

  getMemeComments: async (memeId, earliestId) => {
    try {
      let comments;

      /*
        For pagination, on initial load, it will retrieve the latest comments
        after each subsequent call, expects the id of the earliest comment
        received in order retrieve the next set of comments.
       */
      if (earliestId) {
        comments = await psql('comments')
          .innerJoin('users', 'users.user_id', 'comments.user_id')
          .select([
            'comments.comment_id as commentId',
            'users.username',
            'comments.date_created as dateCreated',
            'comments.text',
          ])
          .where({ meme_id: memeId })
          .andWhere('comment_id', '<', earliestId)
          .orderBy('comment_id', 'desc')
          .limit(COMMENT_PAGE_SIZE);
      } else {
        comments = await psql('comments')
          .innerJoin('users', 'users.user_id', 'comments.user_id')
          .select([
            'comments.comment_id as commentId',
            'users.username',
            'comments.date_created as dateCreated',
            'comments.text',
          ])
          .where({ meme_id: memeId })
          .orderBy('comment_id', 'desc')
          .limit(COMMENT_PAGE_SIZE);
      }

      return {
        isSuccessful: true,
        value: comments,
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to retrieve comments',
      };
    }
  },

  getMemes: async (username, earliestId, user) => {
    try {
      let memes;

      /*
        Get all memes if username not provided. Pagination of memes identical to
        meme comments above.
      */
      if (!username) {
        if (earliestId) {
          memes = await baseMemeQuery(psql, user)
            .andWhere('memes.meme_id', '<', earliestId)
            .orderBy('memes.meme_id', 'desc')
            .limit(MEME_PAGE_SIZE);
        } else {
          memes = await baseMemeQuery(psql, user)
            .orderBy('memes.meme_id', 'desc')
            .limit(MEME_PAGE_SIZE);
        }
        return {
          isSuccessful: true,
          value: memes,
        };
      }
      // else get memes belonging to the provided user
      if (earliestId) {
        memes = await baseMemeQuery(psql, user)
          .andWhere('username', username)
          .andWhere('memes.meme_id', '<', earliestId)
          .orderBy('memes.meme_id', 'desc')
          .limit(MEME_PAGE_SIZE);
      } else {
        memes = await baseMemeQuery(psql, user)
          .andWhere('username', username)
          .orderBy('memes.meme_id', 'desc')
          .limit(MEME_PAGE_SIZE);
      }
      return {
        isSuccessful: true,
        value: memes,
      };
    } catch (e) {
      console.log(e);
      return {
        isSuccessful: false,
        value: 'unexpected error when trying to retrieve memes',
      };
    }
  },
});
