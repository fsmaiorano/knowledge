<template>
  <section class="admin-pages">
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia"/>
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Artigos" active>
            <ArticleAdmin/>
          </b-tab>
          <b-tab title="Categorias">
            <CategoryAdmin/>
          </b-tab>
          <b-tab title="Usuários">
            <UserAdmin/>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </section>
</template>

<script>
import PageTitle from '@/components/template/PageTitle.vue'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'
export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
}
</script>
