<script setup lang="ts">
import { onMounted } from 'vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { gridDatasStore, gridOptionStore, storageData } from '../utils/store/workSpace_store'
import CustomGrid from './CustomGrid.vue'
import AutoColumnsGrid from './AutoColumnsGrid.vue'
import useMobile from '../utils/hooks/useMobile'
import { mobileSelectedImage } from '../utils/store/workSpace_store'
const { handleDragEnd, gridInit, gridOption, handleGridDrag } = useWorkSpace()
const { handleTouchGridEnd, handleTouchGridMove, handleTouchGridStart } = useMobile()
onMounted(() => {
  if (storageData.storageData.length === 0) {
    gridInit()
  }
})
</script>

<template>
  <article
    v-if="!gridOptionStore.isCustom && !gridOptionStore.isAutoColumnsGrid"
    class="flex w-full h-full"
    :style="{
      backgroundColor: gridOption.backgroundColor,
      backgroundImage: `url(${gridOption.backgroundImagePath})`,
      backgroundSize: 'cover'
    }"
    id="captureArea"
  >
    <div
      :class="`h-full p-5  md:p-8 `"
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
            @touchstart="(e) => handleTouchGridStart(value, e)"
            @touchmove="(e) => handleTouchGridMove(e)"
            @touchend="handleTouchGridEnd"
            @touchstart.prevent
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
            class="min-h-[40px]"
          >
            <span
              v-show="value.artist && value.title"
              class="w-full flex text-[10px] items-center justify-center"
            >
              {{ `${value.artist} - ${value.title}` }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-[45%] md:w-[25%] h-full flex flex-col pt-0 md:pt-8 z-30 scale-50 md:scale-100"
      v-if="gridOption.tooltipOption === 'side'"
      :style="{ color: gridOption.textColor }"
    >
      <div v-for="(gridData, index) in gridDatasStore.gridDatas" :key="`tootip-${index}`">
        <div
          v-show="value.artist && value.title"
          v-for="(value, index) in gridData.grids"
          :key="`tootip-${index}`"
        >
          <span class="text-[8px] md:text-[11.5px] md:font-bold">
            {{ `${Number(value.key) + 1}. ${value.artist} - ${value.title}` }}
          </span>
        </div>
      </div>
    </div>

    <img
      v-if="mobileSelectedImage.gridData"
      class="absolute"
      width="80px"
      height="80px"
      :src="mobileSelectedImage.gridData.imagePath"
      :style="{
        left: `${mobileSelectedImage.x}px`,
        top: `${mobileSelectedImage.y}px`,
        visibility: mobileSelectedImage.isEnd ? 'hidden' : 'visible',
        zIndex: mobileSelectedImage.isEnd ? -20 : 100
      }"
    />
  </article>
  <AutoColumnsGrid v-if="gridOptionStore.isAutoColumnsGrid" />
  <CustomGrid v-if="gridOptionStore.isCustom" />
</template>
