<script setup lang="ts">
import { Select, Slider } from 'ant-design-vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { downloadButtonStyle } from '@/components/common/common_styles'

const {
  handleSelect,
  handleTooltip,
  handleColor,
  handleGridGap,
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
          v-model:value="gridOption.tooltipOption"
          class="w-[65%]"
          @change="handleTooltip"
        >
        </Select>
      </div>

      <div class="flex items-center justify-between">
        <label class="w-[35%] ml-2 text-white font-bold"> Background Color </label>
        <input class="w-[65%]" type="color" @change="(e) => handleColor(e, 'background')" />
      </div>

      <!-- <div class="flex items-center justify-between" v-if="gridOption.tooltipOption !== 'none'">
        <label class="w-[35%] ml-2 text-white font-bold"> Tooltip Background Color </label>
        <input class="w-[65%]" type="color" @change="(e) => handleColor(e, 'tooltip')" />
      </div> -->

      <div class="flex items-center justify-between" v-if="gridOption.tooltipOption !== 'none'">
        <label class="w-[35%] ml-2 text-white font-bold"> Tooltip Text Color </label>
        <input class="w-[65%]" type="color" @change="(e) => handleColor(e, 'text')" />
      </div>

      <div class="flex items-center justify-between">
        <label class="w-[35%] ml-2 text-white font-bold"> Grid Gap </label>

        <Slider class="w-[65%]" :min="0" :max="25" @change="handleGridGap" :default-value="1" />
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

<style scoped>
::v-deep .ant-slider-rail {
  background-color: #4b57ff;
}
</style>
