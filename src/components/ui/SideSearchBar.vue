<script setup lang="ts">
import { ref, watch } from 'vue'

import SearchResult from './SearchResult.vue'
import type { AlbumDataInterface } from '@/utils/interface'
import axios from 'axios'

const albumName = ref<string>('')
const artist = ref<string>('')
const searchData = ref<AlbumDataInterface[]>([])

const handleChange = (e: any, key: string) => {
  switch (key) {
    case 'album':
      albumName.value = e.target.value
      break
    case 'artist':
      artist.value = e.target.value

      break
    default:
      break
  }
}

const handleSearch = async () => {
  const res = await axios.get(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumName.value}&api_key=f6e2e55391f8359c9453f57680549175&format=json`
  )
  if (res) {
    console.log(res, 'res !@')
    searchData.value = res.data.results.albummatches.album
  }
}

watch(searchData, (newValue, oldValue) => {
  // 이벤트 핸들러 내부에서 새 값과 이전 값에 대한 작업 수행
  console.log('searchData 값이 변경되었습니다.')
  console.log('새 값:', newValue)
  console.log('이전 값:', oldValue)
})
</script>

<template>
  <div className=" absolute right-0  bg-slate-700 text-white w-[25%] flex  items-center">
    <input className="border text-black" type="text" @input="(e) => handleChange(e, 'album')" />

    <button @click="handleSearch" className="bg-blue-800 p-1 rounded-xl">search</button>

    <SearchResult :searchData="searchData" />
  </div>
</template>
