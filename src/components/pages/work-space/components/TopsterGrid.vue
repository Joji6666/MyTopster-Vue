<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { gridDatasStore } from '../utils/store/workSpace_store'
import type { GridPropertiesInterface } from '../utils/interface/workSpace_store_interface'
const { handleDragEnd, gridOption } = useWorkSpace()

onMounted(() => {
  const tiles: GridPropertiesInterface[] = []

  for (let index = 0; index < gridOption.tileLimit; index++) {
    tiles.push({
      width: 10,
      height: 15,
      imagePath: '',
      title: '',
      key: index.toString()
    })
  }
  gridDatasStore.gridDatas = tiles
})
</script>

<template>
  <article class="bg-slate-800 w-full h-full">
    <div class="flex space-x-1 flex-wrap w-full h-full items-center justify-center">
      <div
        v-for="(value, index) in gridDatasStore.gridDatas"
        :key="index"
        class="bg-white"
        :style="{ width: value.width + '%', height: value.height + '%' }"
        @dragover.prevent
        @drop="handleDragEnd"
        :accesskey="index.toString()"
      >
        <img
          v-show="value.imagePath"
          :src="value.imagePath"
          :style="{ width: value.width + 'px', height: value.height + 'px' }"
        />
      </div>
    </div>
  </article>
</template>
