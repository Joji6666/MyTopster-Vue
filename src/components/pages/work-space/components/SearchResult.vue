<script setup lang="ts">
import useMobile from '../utils/hooks/useMobile'
import useWorkSpace from '../utils/hooks/useWorkSpace'
import type { AlbumDataInterface } from '../utils/interface/interface'
import { mobileSelectedImage } from '../utils/store/workSpace_store'

interface SearchResultPropsInterface {
  searchData: AlbumDataInterface[]
}

const props = defineProps<SearchResultPropsInterface>()

const { handleDragOn } = useWorkSpace()
const { handleTouchStart, handleTouchMove, handleTouchEnd } = useMobile()
</script>

<template>
  <article class="flex flex-wrap h-full mt-10 overflow-y-auto">
    <h2 class="text-blue-600 font-bold w-full">Result</h2>
    <span v-if="props.searchData.length > 0" class="text-[8px] w-full font-bold text-white"
      >Drag image to grid</span
    >
    <span v-if="props.searchData.length > 0" class="text-white text-[8px] w-full font-bold"
      >You can also drop your image file</span
    >
    <img
      v-for="(albumData, index) in props.searchData"
      :key="index"
      class="flex p-1"
      :src="albumData.image[3]['#text']"
      width="80px"
      height="80px"
      draggable="true"
      @dragstart="() => handleDragOn(albumData)"
      @touchstart="(e) => handleTouchStart(albumData, e)"
      @touchmove="(e) => handleTouchMove(albumData, e)"
      @touchend="handleTouchEnd"
      @touchstart.prevent
    />

    <img
      v-if="mobileSelectedImage.data"
      class="absolute"
      width="80px"
      height="80px"
      :src="mobileSelectedImage.data.image[3]['#text']"
      :style="{
        left: `${mobileSelectedImage.x}px`,
        top: `${mobileSelectedImage.y}px`,
        visibility: mobileSelectedImage.isEnd ? 'hidden' : 'visible',
        zIndex: mobileSelectedImage.isEnd ? -20 : 100
      }"
    />
  </article>
</template>
