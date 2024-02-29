<script setup lang="ts">
import { watch } from 'vue'

import SearchResult from './SearchResult.vue'

import { Input } from 'ant-design-vue'
import useWorkSpace from './hooks/useWorkSpace'

const { searchData, handleChange, handleSearch } = useWorkSpace()

watch(searchData, (newValue, oldValue) => {
  // 이벤트 핸들러 내부에서 새 값과 이전 값에 대한 작업 수행
  console.log('searchData 값이 변경되었습니다.')
  console.log('새 값:', newValue)
  console.log('이전 값:', oldValue)
})
</script>

<template>
  <div class="flex flex-col bg-slate-800 h-full">
    <div class="flex">
      <Input
        type="text"
        @input="(e) => handleChange(e, 'album')"
        placeholder="enter: song,album,artist ..."
      />

      <button @click="handleSearch" className="bg-blue-800 p-1 rounded-xl">search</button>
    </div>

    <SearchResult :searchData="searchData" />
  </div>
</template>
