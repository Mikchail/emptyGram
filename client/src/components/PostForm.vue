<template>
    <form @submit.prevent="submit">
        <input type="text" v-model="title">
        <input type="text" v-model="body">
        <button type="submit">Create post</button>
    </form>
</template>
<script>
    import {mapMutations} from 'vuex';

    export default {
        data() {
            return {
                title: '',
                body: ''
            }
        },
        methods: {
            ...mapMutations(['createPost']),
            submit() {
                this.createPost({
                    title: this.title,
                    body: this.body,
                    id: Date.now()
                });
                this.title = '';
                this.body = ''
            }
        }
    }
</script>
<style scoped>
    input {
        display: block;
        width: 100%;
        max-width: 400px;
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
    }

    button {
        border: 1px solid antiquewhite;
        padding: 10px;
        background-color: aqua;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: azure;
    }
</style>