<template>
  <div>
    <!-- <meta http-equiv="refresh" content="0; url=/auth/login"> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { AuthStore } from './stores/Auth';
export default {
  mounted() {
    AuthStore().instanceToken();
  }
}
</script>
