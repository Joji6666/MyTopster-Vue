<script setup lang="ts">
import SearchResult from './SearchResult.vue'

import { Input } from 'ant-design-vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'

const { searchData, handleChange, handleSearch } = useWorkSpace()
</script>

<template>
  <div class="flex flex-col bg-slate-800 h-full overflow-y-auto">
    <span class="w-full flex items-center justify-center font-bold text-white mt-1"
      >Try Search</span
    >

    <form @submit.prevent="handleSearch" class="flex w-full mt-5">
      <Input
        type="text"
        @input="(e) => handleChange(e, 'album')"
        placeholder="enter: song, album, artist ..."
      />

      <button type="submit" class="bg-blue-800 p-1 rounded-xl">search</button>
    </form>
    <span class="p-1 text-white text-[12px] font-bold">You can also drop your image</span>

    <SearchResult :searchData="searchData" />
  </div>
</template>
