<template>
        <div id="content">
        <router-view name="contents" :env="env" :user="user"></router-view>
        </div>
</template>

<script>
export default {
        props: {
                user: Object,
                env: Object,
        }
}
</script>