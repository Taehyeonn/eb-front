<style scoped>

</style>

<template>
  <div id="app">
    <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/list">list</router-link> |
    <router-link to="/list/view/1">View</router-link>
    </nav>
    <main>
      <router-view /> 
    </main>
    <footer>
      <!-- 필요한 경우에 추가적인 전역 컴포넌트나 내용을 포함할 수 있음 -->
    </footer>
  </div>
</template>

<script setup>
</script>