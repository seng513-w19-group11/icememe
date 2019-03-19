# ICEMEME
A site for sharing the coldest memes

## Development
Follow these instructions to set up your development environment.

#### Getting Started
1. Ensure you have the following installed on your system:
    - `git`
    - `nodejs`
    - `yarn` ([install instructions](https://yarnpkg.com/lang/en/docs/install/))


2. Clone the repository and `cd` into it:

        -- ssh
        $ git clone git@github.com:seng513-w19-group11/icememe.git
        -- or --
        -- https
        $ git clone https://github.com/seng513-w19-group11/icememe.git

        -- then
        $ cd icememe/


3. We'll be using [Git Flow (check it out!)](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) to manage workflow and branching. If you want to use the [git extension library](https://github.com/nvie/gitflow/wiki/Installation), now's a good time to initialize it. Follow the following bash history to set the branch names and prefixes:

        $ git flow init

        Which branch should be used for bringing forth production releases?
        - master
        Branch name for production releases: [master]
        Branch name for "next release" development: [develop]

        How to name your supporting branch prefixes?
        Feature branches? [] feature/
        Bugfix branches? [] bugfix/
        Release branches? [] release/
        Hotfix branches? [] hotfix/
        Support branches? [] support/
        Version tag prefix? [] v
        Hooks and filters directory? [/tmp/icememerepo/icememe/.git/hooks]


4. Run yarn to install the dependencies:

        $ yarn


#### Setting up PostgreSQL
It's important for your local development environment to match that of our production environment on Heroku. It's also important for us to be able to modify data and schema in a local database rather than a shared one where we'd be causing problems for each other.

5. Follow the Heroku PostgreSQL [local setup](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup) instructions that apply for your system.

    The part where you export `DATABASE_URL` will need to be repeated at the start of every development session (lifetime of the terminal you run the app from). For reference (from the Heroku docs):

        -- for Mac and Linux
        export DATABASE_URL=postgres://$(whoami)

        -- for Windows
        set DATABASE_URL=postgres://$(whoami)


#### Running the App
There's two ways to run the app: in development mode or production mode.

6. Run the app in development mode:

        $ yarn dev

    This runs two servers:

    - The `quasar dev` server that serves the front-end to your browser (usually on port `8080`, which is where you should go to see the app). It provides error reporting, hot-module-replacement, and other font-end development tools.

    - The `nodemon` server that runs the back-end. It monitors the back-end server source files (like `src/server/main.js`) and restarts the server when they change.


7. To run the app in production mode you need to build it first. Then run it in another step:

        $ yarn build
        $ yarn start

    This mode builds the app into a set of static files at `dist/spa/`. Then the back-end server is used to serve these front-end static files *and* act normally as the back-end server.


## Deployment
Our app will be deployed on Heroku. Kurtis has his GitHub Student Developer Pack connected to Heroku to provide the PostgreSQL add-on. Some things to note:

- Deployments to production must come from the `master` branch. This means we need to move changes through our Git Flow branching model to master before deploying.
- This also means development and testing need to be done on our local machines. If you want to test on a phone, you can try connecting over a local network (e.g. `http://local.pc.ip.address:8080/`) or with a tool like [ngrok](https://ngrok.com/) (ngrok free will only work when running in production mode).