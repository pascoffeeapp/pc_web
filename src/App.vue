<template>
  <div>
    <!-- <meta http-equiv="refresh" content="0; url=/auth/login"> -->
    <router-view :env="env"></router-view>
  </div>
</template>

<script>
import { AuthStore } from './stores/Auth';
export default {
  data() {
    return {
      env: {
        baseURL: 'http://localhost:8000',
      }
    }
  },
  mounted() {
    AuthStore().loadUser();
  }
}
</script>
