<script setup lang="ts">
import { watch } from 'vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { customGridDatas, customGridOptions } from '../utils/store/workSpace_store'

const { handleDragEnd, gridOption, handleGridDrag } = useWorkSpace()

watch(
  () => customGridOptions.type,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      customGridDatas.customGridDatas = []
    }

    if (newValue !== 'onlySmall' && customGridDatas.customGridDatas.length === 0) {
      customGridDatas.customGridDatas.push(
        {
          col: 5,
          count: 0,
          grids: [],
          type: 'large'
        },
        {
          col: 6,
          count: 0,
          grids: [],
          type: 'middle'
        },
        {
          col: 10,
          count: 0,
          grids: [],
          type: 'small'
        }
      )
    }

    if (newValue === 'onlySmall' && customGridDatas.customGridDatas.length === 0) {
      customGridDatas.customGridDatas.push({
        col: 10,
        count: 0,
        grids: [{ width: 0, height: 0, imagePath: '', title: '', key: `1`, artist: '' }]
      })
    }
  }
)
</script>

<template>
  <article
    class="flex w-full h-full"
    :style="{
      backgroundColor: gridOption.backgroundColor
    }"
    id="customCaptureArea"
  >
    <div
      class="h-full p-8"
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
        v-for="(gridData, index) in customGridDatas.customGridDatas"
        :key="`large-${index}`"
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
            :accesskey="value.key.toString()"
          >
            <img
              v-if="value.imagePath"
              :src="value.imagePath"
              class="w-full h-full object-cover"
              @dragover.prevent
              @drop="handleDragEnd"
              @drop.prevent="handleDragEnd"
              :accesskey="value.key.toString()"
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
      :style="{ backgroundColor: gridOption.backgroundColor, color: gridOption.textColor }"
    >
      <div v-for="(gridData, index) in customGridDatas.customGridDatas" :key="`tootip-${index}`">
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
</template>
