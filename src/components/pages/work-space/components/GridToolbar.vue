<script setup lang="ts">
import { Select } from 'ant-design-vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { downloadButtonStyle } from '@/components/common/common_styles'

const { handleSelect, downloadImage } = useWorkSpace()
</script>

<template class="w-full">
  <article class="bg-slate-800 w-full h-full">
    <div class="w-full flex flex-col">
      <div class="flex items-center justify-between">
        <label class="ml-2 text-white font-bold"> Type </label>
        <Select
          :options="[
            { label: 'Type1', value: 'type1' },
            { label: 'Type2', value: 'type2' },
            { label: 'Type3', value: 'type3' },
            { label: 'Type4', value: 'type4' },
            { label: 'Type5', value: 'type5' },
            { label: 'Custom', value: 'custom' }
          ]"
          class="w-[70%]"
          @change="(e) => handleSelect(e, 'type')"
        >
        </Select>
      </div>
    </div>
    <div class="flex space-x-1 w-full items-center justify-end">
      <button :class="downloadButtonStyle" @click="() => downloadImage('png')">PNG Download</button>
      <button :class="downloadButtonStyle" @click="() => downloadImage('jpeg')">
        JPEG Download
      </button>
    </div>
  </article>
</template>
