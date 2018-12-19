<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input type="text" placeholder="Digiter para filtrar..." v-model="treeFilter">
    </div>
    <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree"/>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'
export default {
    name: 'Menu',
    data: function() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: {
                    text: 'name',
                },
                filter: {
                    emptyText: 'Categoria não encontrada',
                },
            },
        }
    },
    components: { Tree },
    computed: {
        ...mapState(['isMenuVisible']),
    },
    methods: {
        getTreeData() {
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) {
            this.$router.push({
                name: 'articlesByCategory',
                params: { id: node.id },
            })

            if (this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        },
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    },
}
</script>

<style lang="scss">
.menu {
    grid-area: menu;
    background: linear-gradient(to right, #233526, #414345);

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #aaa;

        i {
            color: #aaa;
            margin-right: 10px;
        }

        input {
            color: #ccc;
            font-size: 1.3rem;
            border: 0;
            outline: 0;
            width: 100%;
            background: transparent;
        }
    }
    .tree-anchor {
        color: #fff;
    }
    .tree-filter-empty {
        color: #ccc;
        text-align: center;
    }
    .tree-node.selected > .tree-content,
    .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }
}
</style>


