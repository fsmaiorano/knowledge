<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/">{{title}}</router-link>
    </h1>
    <UserDropdown v-if="!hideUserDropdown"/>
  </header>
</template>

<script>
import UserDropdown from '@/components/template/UserDropdown.vue'
export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean,
    },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible
                ? 'fa-angle-left'
                : 'fa-angle-down'
        },
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        },
    },
}
</script>

<style lang="scss">
.header {
    grid-area: header;
    background: linear-gradient(to right, #1e469a, #49a7c1);

    display: flex;
    justify-content: center;
    align-items: center;

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;

        a {
            color: #fff;
            text-decoration: none;
        }
    }

    .toggle {
        color: #fff;
        text-decoration: none;
        width: 60px;
        height: 100%;
        justify-self: flex-start;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
}
</style>

