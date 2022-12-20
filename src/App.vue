<template>
  <div>
    <!-- <meta http-equiv="refresh" content="0; url=/auth/login"> -->
    <router-view :env="env"></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { AuthStore } from './stores/Auth';
export default {
  data() {
    return {
      env: {
        baseURL: '',
      }
    }
  },
  mounted() {
    this.env.baseURL = axios.defaults.baseURL.slice(0,-5);
    AuthStore().loadUser();
  }
}
</script>
