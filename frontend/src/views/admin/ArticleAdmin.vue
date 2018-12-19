<template>
  <div class="article-admin">
    <b-form>
      <input type="hidden" id="article-id" v-model="article.id">
      <b-row>
        <b-col xs="12">
          <b-form-group label="Nome:" label-for="article-name">
            <b-form-input
              id="article-name"
              type="text"
              v-model="article.name"
              :readonly="mode === 'remove'"
              required
              placeholder="Informe o Nome da Artigo..."
            />
          </b-form-group>
          <b-form-group label="Descrição:" label-for="article-description">
            <b-form-input
              id="article-description"
              type="text"
              v-model="article.description"
              :readonly="mode === 'remove'"
              required
              placeholder="Informe a Descrição do Artigo..."
            />
          </b-form-group>
          <b-form-group label="Imagem (URL):" label-for="article-imageUrl">
            <b-form-input
              id="article-imageUrl"
              type="text"
              v-model="article.imageUrl"
              :readonly="mode === 'remove'"
              required
              placeholder="Informe a url da imagem..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Categoria:" label-for="article-categoryId">
            <b-form-select
              id="article-categoryId"
              :options="categories"
              v-model="article.categoryId"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Autor:" label-for="article-userId">
            <b-form-select id="article-userId" :options="users" v-model="article.userId"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="mode === 'save'">
        <b-col xs="12">
          <b-form-group label="Conteúdo:" label-for="article-content">
            <VueEditor v-model="article.content" placeholder="Informe o Conteúdo do Artigo..."/>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-button @click="save" variant="primary" v-if="mode === 'save'">Salvar</b-button>
          <b-button @click="remove" variant="danger" v-if="mode === 'remove'">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr>
    <b-table hover striped :items="articles" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')" class="mr-2">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
import { VueEditor } from 'vue2-editor'
export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [],
            page: 1,
            limit: 0,
            count: 0,
            users: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'actions', label: 'Ações' },
            ],
        }
    },
    watch: {
        page() {
            this.loadArticles()
        },
    },
    methods: {
        loadArticles() {
            axios.get(`${baseApiUrl}/articles?page=${this.page}`).then(res => {
                this.articles = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        loadCategories() {
            axios.get(`${baseApiUrl}/categories`).then(res => {
                this.categories = res.data.map(category => {
                    return { value: category.id, text: category.path }
                })
            })
        },
        loadUsers() {
            axios.get(`${baseApiUrl}/users`).then(res => {
                this.users = res.data.map(user => {
                    return {
                        value: user.id,
                        text: `${user.name} - ${user.email}`,
                    }
                })
            })
        },
        loadArticle(article, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`).then(res => {
                this.article = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
        },
        save() {
            debugger
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.article.id
            axios
                .delete(`${baseApiUrl}/articles/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
    },
    mounted() {
        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    },
}
</script>
