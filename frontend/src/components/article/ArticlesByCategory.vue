<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria"/>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <ArticleItem :article="article"/>
      </li>
    </ul>
    <div class="load-more">
      <button
        v-if="loadMore"
        class="btn btn-lg btn-outline-primary"
        @click="getArticles"
      >Carregar mais artigos...</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '@/components/template/PageTitle'
import ArticleItem from '@/components/article/ArticleItem'
export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true,
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => {
                this.category = res.data[0]
            })
        },
        getArticles() {
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${
                this.page
            }`
            axios.get(url).then(res => {
                this.articles = this.articles.concat(res.data)
                this.page++

                if (res.data.length === 0) this.loadMore = false
            })
        },
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true
            this.getCategory()
            this.getArticles()
        },
    },
    mounted() {
        console.log(this.$route.params.id)
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    },
}
</script>

<style lang="scss">
.articles-by-category {
    ul {
        list-style-type: none;
        padding: 0px;
    }

    .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
}
</style>