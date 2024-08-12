<template>
  <Header />
  <main class="main">
    <RouterView></RouterView>
  </main>
</template>

<script setup>
import Header from './components/Header/Header.vue';
</script>

<style lang="scss" scoped>
.main {
  padding: 5px 50px;
}
</style>
