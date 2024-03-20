<script setup lang="ts">
import './assets/main.css'
import BaseHeader from './components/layout/BaseHeader.vue'
import BaseFooter from './components/layout/BaseFooter.vue'
</script>

<template>
  <article class="w-screen h-screen overflow-hidden bg-slate-950">
    <header class="w-screen h-[10%]">
      <BaseHeader />
    </header>
    <main class="w-screen h-[80%] overflow-hidden">
      <RouterView />
    </main>

    <!-- <footer class="w-screen absolute bottom-0 h-[10%]">
    <BaseFooter />
  </footer> -->
  </article>
</template>
