<template>
    <div class="foo" v-if="list">
        <p>foo</p>
        <button @click="handleClick">aaa</button>
        <ul>
            <li v-for="item in list" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import fooStoreModule from '../store/modules/foo';

const wrapMapState = function (...args) {
    console.log('map state')
    return mapState(...args)
}

const wrapMapActions = (...args) => {
    console.log('map actions')
    return mapActions(...args)
}

export default {
    asyncData({ store }) {
        store.registerModule('foo', fooStoreModule);
        console.log('registered');
        return store.dispatch('foo/getItems');
    },
    // created() {
    //     this.$store.registerModule('foo', fooStoreModule);
    //     console.log('registered');
    //     this.$store.dispatch('foo/getItems');
    // },
    data() {
        return {
            // list: [],
        };
    },
    computed: {
        ...wrapMapState({
            list: state => state.foo.list
        })
        // list() { return this.$store.state.foo.list }
    },
    methods: {
        ...wrapMapActions('foo', ['getItems']),
        handleClick() {
            console.log(this.$store.state)
        }
    },
    destroyed() {
        this.$store.unregisterModule('foo');
    }
};
</script>

<style lang="stylus" scoped>
    .foo
        border: 1px solid #eee;
        color: #666;
</style>