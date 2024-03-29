<script setup lang="ts">
import CustomGridToolbar from './CustomGridToolbar.vue'
import { Select, Slider, Popconfirm } from 'ant-design-vue'
import { SaveOutlined, DeleteOutlined, ClearOutlined } from '@ant-design/icons-vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import { downloadButtonStyle } from '@/components/common/common_styles'
import { onMounted } from 'vue'
import useStorage from '../utils/hooks/useStorage'

const {
  handleSelect,
  handleTooltip,
  handleColor,
  handleGridGap,
  handleDelete,
  handleClear,
  downloadImage,
  gridTypeOptions,
  gridOption,
  tooltipOptions
} = useWorkSpace()

const {
  createLocalStorage,
  deleteStorage,
  saveStorage,
  getLocalStorage,
  storageOptions,
  handleWork,
  addWork
} = useStorage()

onMounted(() => {
  if (!localStorage.getItem('datas')) {
    createLocalStorage()
  }

  getLocalStorage()

  window.addEventListener('beforeunload', saveStorage)
})
</script>

<template class="w-full">
  <article class="bg-slate-800 w-full h-full">
    <div class="w-full flex flex-col space-y-5 p-1">
      <span class="w-full flex items-center justify-center font-bold text-white">Options</span>

      <div class="flex items-center justify-between mt-10">
        <label class="ml-2 text-white font-bold"> My Works </label>
        <Select
          :options="storageOptions"
          v-model:value="gridOption.selectedWork"
          class="w-[65%]"
          @change="(e) => handleWork(e, 'work')"
        >
        </Select>
      </div>

      <div class="flex space-x-1 w-full items-center justify-end">
        <div :class="downloadButtonStyle" @click="addWork">
          <span>Add Work</span>
        </div>

        <Popconfirm
          title="Are you sure to delete?"
          placement="rightTop"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteStorage"
          ok-type="danger"
          v-if="storageOptions.length > 1"
        >
          <div :class="downloadButtonStyle">
            <span>Delete Work</span>
          </div>
        </Popconfirm>
      </div>

      <div class="flex items-center justify-between mt-10">
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

      <CustomGridToolbar v-if="gridOption.gridType === 'custom'" />

      <div class="flex space-x-1 w-full items-center justify-end">
        <div :class="downloadButtonStyle" @click="() => downloadImage('png')">
          <SaveOutlined />
          <span>PNG Download</span>
        </div>

        <div :class="downloadButtonStyle" @click="() => downloadImage('jpeg')">
          <SaveOutlined />
          <span>JPEG Download</span>
        </div>
      </div>

      <div class="font-bold rounded-xl flex items-center justify-end w-full mr-2">
        <span class="text-[12.5px] text-white font-bold">Drag to Delete</span>
        <DeleteOutlined
          class="mr-2 text-[40px]"
          @dragover.prevent
          @drop="handleDelete"
          @drop.prevent="handleDelete"
        />
      </div>

      <div class="flex items-center justify-end text-[40px]">
        <span class="text-[12.5px] mr-1 text-white font-bold">Clear</span>
        <Popconfirm
          title="Are you sure to clear?"
          placement="rightTop"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleClear"
          ok-type="danger"
        >
          <ClearOutlined class="mr-2"></ClearOutlined>
        </Popconfirm>
      </div>
    </div>
  </article>
</template>

<style scoped>
::v-deep .ant-slider-rail {
  background-color: #4b57ff;
}
</style>
