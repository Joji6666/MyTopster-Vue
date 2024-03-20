<script setup lang="ts">
import './assets/main.css'
import BaseHeader from './components/layout/BaseHeader.vue'
import BaseFooter from './components/layout/BaseFooter.vue'
</script>

<template>
  <article class="w-screen h-screen overflow-y-auto overflow-x-hidden bg-slate-950">
    <header class="w-screen h-[10%] fixed top-0 z-50">
      <BaseHeader />
    </header>
    <main class="w-screen h-[90%] mt-24">
      <RouterView />
    </main>

    <!-- <footer class="w-screen absolute bottom-0 h-[10%]">
    <BaseFooter />
  </footer> -->
  </article>
</template>
