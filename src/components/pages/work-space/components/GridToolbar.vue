<script setup lang="ts">
import { Select } from 'ant-design-vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { downloadButtonStyle } from '@/components/common/common_styles'

const {
  handleSelect,
  handleTooltip,
  handleBackgroundColor,
  downloadImage,
  gridTypeOptions,
  gridOption,
  tooltipOptions
} = useWorkSpace()
</script>

<template class="w-full">
  <article class="bg-slate-800 w-full h-full">
    <div class="w-full flex flex-col space-y-5">
      <div class="flex items-center justify-between">
        <label class="ml-2 text-white font-bold"> Type </label>
        <Select
          :options="gridTypeOptions"
          v-model:value="gridOption.gridType"
          class="w-[65%]"
          @change="(e) => handleSelect(e, 'type')"
        >
        </Select>
      </div>

      <div class="flex items-center justify-between">
        <label class="ml-2 text-white font-bold"> Tooltip </label>
        <Select
          :options="tooltipOptions"
          v-model:value="gridOption.gridType"
          class="w-[65%]"
          @change="handleTooltip"
        >
        </Select>
      </div>

      <div class="flex items-center justify-between">
        <label class="ml-2 text-white font-bold"> Background Color </label>
        <input class="w-[90%]" type="color" @change="handleBackgroundColor" />
      </div>
      <div class="flex space-x-1 w-full items-center justify-end">
        <button :class="downloadButtonStyle" @click="() => downloadImage('png')">
          PNG Download
        </button>
        <button :class="downloadButtonStyle" @click="() => downloadImage('jpeg')">
          JPEG Download
        </button>
      </div>
    </div>
  </article>
</template>
