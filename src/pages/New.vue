<template>
  <q-page class="page-frame">
    <div class="text-h6 q-py-md">
      Upload Meme
    </div>
    <form
      v-if="loggedIn"
      @submit.prevent.stop="onSubmit"
    >
      <q-input
        ref="memeTitle"
        v-model="memeTitle"
        outlined
        label="Enter a title..."
        :rules="[val => !!val || 'Field is required']"
      />
      <div id="dropbox">
        <q-input
          id="new-meme-input"
          v-model="fileInput"
          outlined
          type="file"
          accept="image/*"
          clearable
          @change="fileChosen"
        />
        <q-input
          id="new-meme-facade"
          ref="fileName"
          v-model="fileName"
          outlined
          label="Choose file..."
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <q-item>
        <img id="new-meme-preview">
      </q-item>
      <q-btn
        label="Upload"
        color="primary"
        type="submit"
        class="full-width"
      />
    </form>
    <div
      v-else
      class="text-body1"
    >
      You must be logged in to adjust settings.
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

const CLOUD_NAME = process.env.CLOUDINARY_NAME;
const CLOUD_PRESET = process.env.CLOUDINARY_PRESET;

export default {
  name: 'PageNewMeme',
  data() {
    return {
      file: null,
      fileName: null,
      fileInput: null,
      memeTitle: null,
      accept: false,
    };
  },
  computed: {
    ...mapGetters([
      'loggedIn',
    ]),
  },
  watch: {
    loggedIn(value) {
      if (!value) {
        this.$router.push({ name: 'main' });
      }
    },
  },
  methods: {
    fileChosen(e) {
      const input = e.target;
      const output = document.getElementById('new-meme-preview');
      const reader = new FileReader();
      reader.onload = function setMemePreviewImg() {
        output.src = reader.result;
      };
      try {
        [this.file] = input.files;
        this.fileName = this.file.name;
        reader.readAsDataURL(this.file);
      } catch (error) {
        this.fileName = '';
        output.src = '';
      }
    },
    onSubmit() {
      this.$refs.memeTitle.validate();
      this.$refs.fileName.validate();

      if (this.$refs.memeTitle.hasError || this.$refs.fileName.hasError) {
        this.formHasError = true;
      } else {
        this.uploadFile();
        this.memeTitle = null;
        this.file = null;
        this.fileName = null;
        this.fileInput = null;
        document.getElementById('new-meme-preview').src = '';
        this.$q.notify({
          icon: 'cloud_upload',
          color: 'info',
          message: 'Uploading',
        });
        window.setTimeout(this.reset, 100);
      }
    },
    reset() {
      this.$refs.memeTitle.resetValidation();
      this.$refs.fileName.resetValidation();
    },
    uploadFile() {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
      const xhr = new XMLHttpRequest();
      const fd = new FormData();

      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      const socket = this.$socket;
      const { memeTitle, $q, $router } = this;

      xhr.onreadystatechange = function sendingDone() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          socket.emit('addMeme', { title: memeTitle, cloudinaryUrl: response.secure_url }, (saveResult) => {
            if (saveResult.isSuccessful) {
              $q.notify({
                icon: 'done',
                color: 'positive',
                message: 'Meme created',
              });
              $router.push({ name: 'meme', params: { memeId: saveResult.value.memeId } });
            }
          });
        }
      };

      fd.append('upload_preset', CLOUD_PRESET);
      fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      fd.append('file', this.file);
      xhr.send(fd);
    },
  },
};
</script>

<style>
  #new-meme-preview {
    display: block;
    margin: auto;
    max-width: 100%;
    max-height: 100vh;
  }

  #dropbox {
    width: 100%;
    position: relative;
  }

  #new-meme-input {
    position: absolute;
    width: inherit;
  }

  #new-meme-input input {
    position: static;
    height: inherit;
    width: 200%;
    opacity: 0;
    z-index: 2;
  }

  #new-meme-facade {
    position: relative;
  }
</style>
