<script setup lang="ts">
import { onMounted } from 'vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { gridDatasStore, gridOptionStore, storageData } from '../utils/store/workSpace_store'
import CustomGrid from './CustomGrid.vue'
import AutoColumnsGrid from './AutoColumnsGrid.vue'
const { handleDragEnd, gridInit, gridOption, handleGridDrag } = useWorkSpace()

onMounted(() => {
  if (storageData.storageData.length === 0) {
    gridInit()
  }
})
</script>

<template>
  <article
    v-if="gridOption.gridType !== 'custom' && !gridOption.isAutoColumnsGrid"
    class="flex w-full h-full"
    :style="{
      backgroundColor: gridOption.backgroundColor,
      backgroundImage: `url(${gridOption.backgroundImagePath})`,
      backgroundSize: 'cover'
    }"
    id="captureArea"
  >
    <div
      :class="`h-full p-8 `"
      :style="{
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
            class="min-h-[45px]"
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
      class="w-[25%] h-full flex flex-col z-30"
      v-if="gridOption.tooltipOption === 'side'"
      :style="{ color: gridOption.textColor }"
    >
      <div v-for="(gridData, index) in gridDatasStore.gridDatas" :key="`tootip-${index}`">
        <div
          v-show="value.artist && value.title"
          v-for="(value, index) in gridData.grids"
          :key="`tootip-${index}`"
        >
          <span class="text-[11.5px] font-bold">
            {{ `${Number(value.key) + 1}. ${value.artist} - ${value.title}` }}
          </span>
        </div>
      </div>
    </div>
  </article>
  <AutoColumnsGrid v-if="gridOptionStore.isAutoColumnsGrid" />
  <CustomGrid v-if="gridOption.gridType === 'custom'" />
</template>
