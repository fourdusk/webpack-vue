<template>
    <div>
        <h1 class="h1">初始化</h1>
        <div>{{ userName }}</div>
        <div>{{ counter }}</div>
        <div>
            <button @click="onSyncIncreaseCounter">同步增加计数</button>
            <button @click="onAsyncIncreaseCounter">异步增加计数</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import apiArticle from '@/api/article' // eslint-disable-line

export default {
    computed: {
        ...mapGetters({ userName: 'user/userName', counter: 'counter' })
    },
    created() {
        apiArticle.getArticleList({}).then(res => {
            console.log(typeof res)
        })
    },
    methods: {
        ...mapMutations({
            SET_COUNTER: 'SET_COUNTER'
        }),
        ...mapActions({
            increaseCounter: 'increaseCounter'
        }),
        onSyncIncreaseCounter() {
            this.SET_COUNTER()
        },
        onAsyncIncreaseCounter() {
            this.increaseCounter()
        }
    }
}
</script>

<style lang="scss">
.h1 {
    font-size: 28px; /*no*/
}
</style>
