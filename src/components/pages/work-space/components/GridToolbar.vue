<script setup lang="ts">
import { Select } from 'ant-design-vue'
import useWorkSpace from '../utils/hooks/useWorkSpace'

const { handleSelect } = useWorkSpace()
</script>

<template class="w-full">
  <article class="bg-slate-800 w-full h-full">
    <div class="w-full flex flex-col">
      <label> Type </label>
      <Select
        :options="[
          { label: 'Type1', value: 'type1' },
          { label: 'Type2', value: 'type2' },
          { label: 'Type3', value: 'type3' },
          { label: 'Type4', value: 'type4' },
          { label: 'Type5', value: 'type5' },
          { label: 'Custom', value: 'custom' }
        ]"
        class="w-[50%]"
        @change="(e) => handleSelect(e, 'type')"
      >
      </Select>
    </div>
  </article>
</template>
