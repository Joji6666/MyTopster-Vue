<script setup lang="ts">
import BaseFooter from './BaseFooter.vue'
import BaseHeader from './BaseHeader.vue'
</script>

<template>
  <div>
    <header>
      <BaseHeader />
    </header>
    <main>
      <!-- 내용 -->
      <slot></slot>
    </main>
    <footer>
      <!-- 공통 푸터 -->
      <BaseFooter />
    </footer>
  </div>
</template>
