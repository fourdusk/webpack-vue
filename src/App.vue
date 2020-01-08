<template>
    <div id="app">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </nav>
        <router-view />
    </div>
</template>

<style>
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
