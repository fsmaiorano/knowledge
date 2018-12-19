<template>
  <section class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento"/>
    <div class="stats">
      <Statistics title="Categorias" :value="stat.categories" icon="fa fa-folder" color="#d54d50"/>
      <Statistics title="Artigos" :value="stat.articles" icon="fa fa-file" color="#3bc480"/>
      <Statistics title="Usuários" :value="stat.users" icon="fa fa-user" color="#3282cd"/>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import PageTitle from '@/components/template/PageTitle.vue'
import Statistics from '@/views/home/Statistics'
import { baseApiUrl } from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Statistics },
    data() {
        return {
            stat: {},
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => (this.stat = res.data))
        },
    },
    mounted() {
        this.getStats()
    },
}
</script>

<style lang="scss">
.stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>
