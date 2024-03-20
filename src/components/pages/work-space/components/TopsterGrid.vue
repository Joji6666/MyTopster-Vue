<script setup lang="ts">
import { onMounted } from 'vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { gridDatasStore } from '../utils/store/workSpace_store'

const { handleDragEnd, gridInit, gridOption, handleGridDrag } = useWorkSpace()

onMounted(() => {
  gridInit()
})
</script>

<template>
  <article class="flex w-full h-full" id="captureArea">
    <div
      class="h-full p-1"
      :style="{
        backgroundColor: gridOption.backgroundColor,
        width: gridOption.tooltipOption !== 'side' ? '100%' : '75%'
      }"
    >
      <div
        class="grid mb-2"
        :style="{
          gridTemplateColumns: `repeat(${gridData.col}, minmax(0, 1fr))`,
          gap: `${gridOption.gridGap > 0 ? gridOption.gridGap + 3 : 0}px`
        }"
        v-for="(gridData, index) in gridDatasStore.gridDatas"
        :key="`large-${index}`"
        v-show="gridData.count > 0"
      >
        <div
          v-for="(value, gridIndex) in gridData.grids"
          :key="`grid-${gridIndex}`"
          class="flex flex-col"
        >
          <div
            class="aspect-square bg-white"
            @dragover.prevent
            @drop="handleDragEnd"
            @drop.prevent="handleDragEnd"
            draggable="true"
            @dragstart="() => handleGridDrag(value)"
            :accesskey="value.key"
          >
            <img
              v-if="value.imagePath"
              :src="value.imagePath"
              class="w-full h-full object-cover"
              @dragover.prevent
              @drop="handleDragEnd"
              @drop.prevent="handleDragEnd"
              :accesskey="value.key"
            />
          </div>

          <div
            v-if="gridOption.tooltipOption === 'bottom'"
            :style="{ color: gridOption.textColor }"
          >
            <span
              v-show="value.artist && value.title"
              class="w-full flex items-center justify-center"
            >
              {{ `${value.artist} - ${value.title}` }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-[25%] h-full flex flex-col"
      v-if="gridOption.tooltipOption === 'side'"
      :style="{ backgroundColor: gridOption.tooltipBackgroundColor, color: gridOption.textColor }"
    >
      <div v-for="(gridData, index) in gridDatasStore.gridDatas" :key="`tootip-${index}`">
        <div
          v-show="value.artist && value.title"
          v-for="(value, index) in gridData.grids"
          :key="`tootip-${index}`"
        >
          <span>
            {{ `${index + 1}. ${value.artist} - ${value.title}` }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>
