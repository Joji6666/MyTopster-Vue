<script setup lang="ts">
import { onMounted } from 'vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { gridDatasStore } from '../utils/store/workSpace_store'

const { handleDragEnd, gridInit } = useWorkSpace()

onMounted(() => {
  gridInit()
})
</script>

<template>
  <article class="bg-slate-800 w-full h-full p-4 overflow-y-auto" id="captureArea">
    <div class="grid grid-cols-5 gap-4 mb-4">
      <div
        v-for="(value, index) in gridDatasStore.gridDatas.slice(0, 10)"
        :key="`large-${index}`"
        class="aspect-square bg-white"
        @dragover.prevent
        @drop="handleDragEnd(value.key)"
        :accesskey="index.toString()"
      >
        <img v-if="value.imagePath" :src="value.imagePath" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="grid grid-cols-6 gap-4 mb-4">
      <div
        v-for="(value, index) in gridDatasStore.gridDatas.slice(10, 22)"
        :key="`medium-${index}`"
        class="aspect-square bg-white"
        @dragover.prevent
        @drop="handleDragEnd(value.key)"
        :accesskey="index.toString()"
      >
        <img v-if="value.imagePath" :src="value.imagePath" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="grid grid-cols-10 gap-4">
      <div
        v-for="(value, index) in gridDatasStore.gridDatas.slice(22, 42)"
        :key="`small-${index}`"
        class="aspect-square bg-white"
        @dragover.prevent
        @drop="handleDragEnd(value.key)"
        :accesskey="index.toString()"
      >
        <img v-if="value.imagePath" :src="value.imagePath" class="w-full h-full object-cover" />
      </div>
    </div>
  </article>
</template>
