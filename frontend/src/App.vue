<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="Knowledge" :hideToggle="!user" :hideUserDropdown="!user"/>
    <Menu v-if="user"/>
    <Loading v-if="validatingToken"/>
    <Content v-else/>
    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import Menu from '@/components/template/Menu.vue'
import Loading from '@/components/template/Loading.vue'
import Header from '@/components/template/Header.vue'
import Footer from '@/components/template/Footer.vue'
import Content from '@/components/template/Content.vue'
import { mapState } from 'vuex'
export default {
    name: 'App',
    components: { Header, Menu, Content, Footer, Loading },
    computed: {
        ...mapState(['isMenuVisible', 'user']),
    },
    data: function() {
        return {
            validatingToken: true,
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

            if (!userData) {
                this.validatingToken = false
                this.$router.push({ name: 'auth' })
                return
            }

            const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

            if (res.data) {
                this.$store.commit('setUser', userData)

                if (this.$mq === 'xs' || this.$mq === 'sm') {
                    this.$store.commit('toggleMenu', false)
                }
            } else {
                localStorage.removeItem(userKey)
            }

            this.validatingToken = false
        },
    },
    created() {
        this.validateToken()
    },
}
</script>


<style lang="scss">
* {
    font-family: 'Lato', sans-serif;
}
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: grid;
    grid-template-rows: 60px 1fr 40px;
    grid-template-columns: 300px 1fr;
    grid-template-areas:
        'header header'
        'menu content'
        'menu footer';
}
.hide-menu {
    grid-template-areas:
        'header header'
        'content content'
        'footer footer' !important;
}
</style>
