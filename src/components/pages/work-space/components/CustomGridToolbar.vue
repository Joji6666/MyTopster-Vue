<script setup lang="ts">
import { Select, Slider } from 'ant-design-vue'
import { customGridOptions } from '../utils/store/workSpace_store'
import useCustomGrid from '../utils/hooks/useCustomGrid'

const { handleCustomGridRowAndCol, handleCustomGridTiles, handleCustomGridType } = useCustomGrid()

const customGridTypeOptions = [
  { label: 'OnlySmall', value: 'onlySmall' },
  { label: 'Comprehensive', value: 'comprehensive' }
]
</script>

<template class="w-full">
  <div class="flex items-center justify-between mt-10">
    <label class="ml-2 text-white font-bold"> Type </label>
    <Select
      :options="customGridTypeOptions"
      v-model:value="customGridOptions.type"
      class="w-[65%]"
      @change="(e) => handleCustomGridType(e)"
    >
    </Select>
  </div>
  <div class="flex flex-col" v-if="customGridOptions.type === 'onlySmall'">
    <div class="flex items-center justify-between">
      <label class="w-[35%] ml-2 text-white font-bold"> Rows </label>

      <Slider
        class="w-[65%]"
        :min="0"
        :max="10"
        v-on:change="(e) => handleCustomGridRowAndCol(e, 'row')"
        :default-value="1"
      />
    </div>

    <div class="flex items-center justify-between">
      <label class="w-[35%] ml-2 text-white font-bold"> Cols </label>

      <Slider
        class="w-[65%]"
        :min="0"
        :max="20"
        v-on:change="(e) => handleCustomGridRowAndCol(e, 'col')"
        :default-value="0"
      />
    </div>
  </div>

  <div class="flex flex-col" v-if="customGridOptions.type !== 'onlySmall'">
    <div class="flex items-center justify-between">
      <label class="w-[35%] ml-2 text-white font-bold"> Large Tiles </label>

      <Slider
        class="w-[65%]"
        :min="0"
        :max="50"
        v-on:change="(e) => handleCustomGridTiles(e, 'large')"
        :default-value="0"
      />
    </div>

    <div class="flex items-center justify-between">
      <label class="w-[35%] ml-2 text-white font-bold"> Middle Tiles </label>

      <Slider
        class="w-[65%]"
        :min="0"
        :max="100"
        v-on:change="(e) => handleCustomGridTiles(e, 'middle')"
        :default-value="0"
      />
    </div>

    <div class="flex items-center justify-between">
      <label class="w-[35%] ml-2 text-white font-bold"> Small Tiles </label>

      <Slider
        class="w-[65%]"
        :min="0"
        :max="200"
        v-on:change="(e) => handleCustomGridTiles(e, 'small')"
        :default-value="0"
      />
    </div>
  </div>
</template>

<style scoped>
::v-deep .ant-slider-rail {
  background-color: #4b57ff;
}
</style>
