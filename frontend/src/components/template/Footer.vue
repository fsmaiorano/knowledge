<template>
  <footer class="footer">
    <span>
      Copyright
      <strong>Vue with NodeJS</strong> &#169; 2018
    </span>
  </footer>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style lang="scss">
.footer {
    grid-area: footer;
    background-color: #ddd;
    color: #333;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
}
</style>

