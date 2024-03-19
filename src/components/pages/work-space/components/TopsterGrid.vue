<script setup lang="ts">
import { onMounted } from 'vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { gridDatasStore } from '../utils/store/workSpace_store'

const { handleDragEnd, gridInit, gridOption } = useWorkSpace()

onMounted(() => {
  gridInit()
})
</script>

<template>
  <article class="flex w-full h-full overflow-y-auto" id="captureArea">
    <div
      class="h-full p-4"
      :style="{
        backgroundColor: gridOption.backgroundColor,
        width: gridOption.tooltipOption !== 'side' ? '100%' : '70%'
      }"
    >
      <div class="grid grid-cols-5 gap-4 mb-4">
        <div
          v-for="(value, index) in gridDatasStore.gridDatas.slice(0, 10)"
          :key="`large-${index}`"
          class="aspect-square bg-white"
          @dragover.prevent
          @drop="handleDragEnd"
          @drop.prevent="handleDragEnd"
          :accesskey="value.key"
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
          @drop="handleDragEnd"
          @drop.prevent="handleDragEnd"
          :accesskey="value.key"
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
          @drop="handleDragEnd"
          @drop.prevent="handleDragEnd"
          :accesskey="value.key"
        >
          <img v-if="value.imagePath" :src="value.imagePath" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
    <div
      class="w-[30%] h-full flex flex-col"
      v-if="gridOption.tooltipOption === 'side'"
      :style="{ backgroundColor: gridOption.tooltipBackgroundColor, color: gridOption.textColor }"
    >
      <span
        v-show="value.artist && value.title"
        v-for="(value, index) in gridDatasStore.gridDatas"
        :key="`tootip-${index}`"
      >
        {{ `${index + 1}. ${value.artist} - ${value.title}` }}
      </span>
    </div>
  </article>
</template>
