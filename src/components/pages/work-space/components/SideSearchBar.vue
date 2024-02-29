<script setup lang="ts">
import SearchResult from './SearchResult.vue'

import { Input } from 'ant-design-vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'

const { searchData, handleChange, handleSearch } = useWorkSpace()
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
