<script setup lang="ts">
import { useRouter } from 'vue-router'

const buttonStyle =
  'p-3 rounded-2xl text-white w-[170px] text-center hover:scale-105 cursor-pointer'

const router = useRouter()
</script>

<template>
  <article class="flex flex-col h-full w-full items-center mt-[80px]">
    <h2
      class="flex items-center justify-center w-full text-[90px] p-3 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
    >
      Make Your Topster And Shere!
    </h2>
    <div class="w-full h-[250px] flex items-center justify-center space-x-2">
      <button @click="router.push(`/work-space`)" :class="buttonStyle + ' bg-blue-500'">
        Create Your Topster
      </button>
      <button :class="buttonStyle + ' bg-gray-600'">How To Use</button>
    </div>
  </article>
</template>
