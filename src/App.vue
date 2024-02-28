<script setup lang="ts">
import MainView from './views/MainView.vue'
import './assets/main.css'
import BaseHeader from './components/layout/BaseHeader.vue'
import BaseFooter from './components/layout/BaseFooter.vue'
</script>

<template>
  <header>
    <BaseHeader />
  </header>
  <main>
    <MainView />
  </main>

  <footer>
    <BaseFooter />
  </footer>
</template>
