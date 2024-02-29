<script setup lang="ts">
import type { AlbumDataInterface } from './utils/interface/interface'

interface SearchResultPropsInterface {
  searchData: AlbumDataInterface[]
}

const props = defineProps<SearchResultPropsInterface>()
</script>

<template>
  <article class="flex flex-wrap h-full overflow-y-auto mt-10">
    <h2 class="text-blue-600 font-bold w-full">Result</h2>
    <img
      v-for="(albumData, index) in props.searchData"
      :key="index"
      class="flex p-1"
      :src="albumData.image[3]['#text']"
      width="100px"
      height="100px"
    />
  </article>
</template>
@/components/pages/work-space/utils/interface/interface
