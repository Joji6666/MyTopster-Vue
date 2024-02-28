<script setup lang="ts">
import type { AlbumDataInterface } from '@/utils/interface'

interface SearchResultPropsInterface {
  searchData: AlbumDataInterface[]
}

const props = defineProps<SearchResultPropsInterface>()
console.log(props.searchData)
</script>

<template>
  <div>
    <img
      v-for="(albumData, index) in props.searchData"
      :key="index"
      class="flex p-1"
      :src="albumData.image[3]['#text']"
      width="50px"
      height="50px"
    />
  </div>
</template>
