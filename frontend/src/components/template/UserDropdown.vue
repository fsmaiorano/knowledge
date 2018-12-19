<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{user.name}}</span>
      <div class="user-dropdown__img">
        <Gravatar :email="user.email" alt="user image"/>
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown__content">
      <router-link v-if="user.admin" to="/admin">
        <i class="fa fa-cog">Administração</i>
      </router-link>
      <a href="#" @click.prevent="logout">
        <i href class="fa fa-sign-out">Sair</i>
      </a>
    </div>
  </div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'
export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: {
        ...mapState(['user']),
    },
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        },
    },
}
</script>

<style lang="scss">
.user-dropdown {
    position: relative;
    height: 100%;

    .user-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;

        &:hover {
            background-color: rgba(0, 0, 0, 0.2);
        }
    }

    &__img {
        margin: 0px 10px;

        > img {
            height: 37px;
            border-radius: 5px;
        }
    }

    &__content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;

        a {
            text-decoration: none;
            color: #000;
            padding: 10px;
            width: 100%;

            &:hover {
                text-decoration: none;
                color: #000;
                background-color: #ededed;
            }
        }
    }
    &:hover &__content {
        visibility: visible;
        opacity: 1;
    }
}
</style>

