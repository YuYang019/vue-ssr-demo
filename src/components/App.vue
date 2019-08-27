<template>
    <div id="app"> 
        Hello {{ text }} 
        <header>
            <router-link to="/bar">Bar</router-link>
            <router-link to="/foo">Foo</router-link>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: 'APP'
        }
    }
}
</script>

<style lang="stylus">
    body {
        font-size: 12px;
    }
</style>
