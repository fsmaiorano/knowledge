<template>
  <div class="article-item">
    <router-link :to="{name: 'ArticlesById', params: {id: article.id}}">
      <div class="article-item-image d-none d-sm-block">
        <img v-if="article.imageUrl" src="@/assets/logo.png" height="150" width="150" alt="Article">
        <img v-else src="@/assets/logo.png" height="150" width="150" alt="Article">
      </div>
      <div class="article-item-info">
        <h2>{{article.name}}</h2>
        <p>{{article.description}}</p>
        <span class="article-item-author">
          <strong>Autor:&nbsp;</strong>
          {{article.author}}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: ['article'],
}
</script>

<style lang="scss">
.article-item {
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

    a,
    a:hover,
    a:active,
    a:link {
        text-decoration: none;
        display: flex;
        align-items: flex-start;
        color: #000;
    }

    .article-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #aaa;

        img {
            border-radius: 5px;
        }
    }

    .article-item-info {
        display: flex;
        flex-direction: column;
        align-self: stretch;
        h2 {
            font-size: 1.7rem;
        }

        p {
            flex: 1;
            color: #555;
            font-size: 1.1rem;
        }
    }
}
</style>
