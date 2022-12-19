<template>
        <div id="content">
        <router-view name="contents" :user="user"></router-view>
        </div>
</template>

<script>
export default {
        props: {
                user: Object,
        }
}
</script>