<script setup lang="ts">
import useWorkSpace from '../utils/hooks/useWorkSpace'
import type { AlbumDataInterface } from '../utils/interface/interface'

interface SearchResultPropsInterface {
  searchData: AlbumDataInterface[]
}

const props = defineProps<SearchResultPropsInterface>()

const { handleDragOn } = useWorkSpace()
</script>

<template>
  <article class="flex flex-wrap h-full mt-10">
    <h2 class="text-blue-600 font-bold w-full">Result</h2>
    <img
      v-for="(albumData, index) in props.searchData"
      :key="index"
      class="flex p-1"
      :src="albumData.image[3]['#text']"
      width="80px"
      height="80px"
      draggable="true"
      @dragstart="() => handleDragOn(albumData)"
    />
  </article>
</template>
