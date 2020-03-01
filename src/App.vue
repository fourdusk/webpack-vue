<template>
    <div id="app">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </nav>
        <div class="logo"></div>
        <div class="img"></div>
        <router-view />
    </div>
</template>

<style lang="scss">
@import '~@/assets/style/app.scss';
#app {
    margin-top: 20px;
    padding-top: 20px;
}
</style>

<script>
export default {
    data() {
        return {
            hello: 'world'
        }
    }
}
</script>
