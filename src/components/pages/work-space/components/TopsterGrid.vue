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
  <article class="flex w-full h-full overflow-y-auto" id="captureArea">
    <div
      class="h-full p-4"
      :style="{
        backgroundColor: gridOption.backgroundColor,
        width: gridOption.tooltipOption !== 'side' ? '100%' : '70%'
      }"
    >
      <div
        class="grid grid-cols-5 mb-4"
        :style="{ gap: `${gridOption.gridGap > 0 ? gridOption.gridGap + 3 : 0}px` }"
      >
        <div
          v-for="(value, index) in gridDatasStore.gridDatas.slice(0, 10)"
          :key="`large-${index}`"
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
      <div
        class="grid grid-cols-6 mb-4"
        :style="{ gap: `${gridOption.gridGap > 0 ? gridOption.gridGap + 3 : 0}px` }"
      >
        <div
          v-for="(value, index) in gridDatasStore.gridDatas.slice(10, 22)"
          :key="`medium-${index}`"
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
      <div
        class="grid grid-cols-10"
        :style="{ gap: `${gridOption.gridGap > 0 ? gridOption.gridGap + 3 : 0}px` }"
      >
        <div
          v-for="(value, index) in gridDatasStore.gridDatas.slice(22, 42)"
          :key="`small-${index}`"
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
