<script setup lang="ts">
import { Row, Col } from 'ant-design-vue'
import SideSearchBarVue from '../SideSearchBar.vue'
import TopsterGrid from '../TopsterGrid.vue'
import GridToolbar from '../GridToolbar.vue'

import useWorkSpace from '../../utils/hooks/useWorkSpace'

const { gridOption } = useWorkSpace()
</script>

<template>
  <article class="flex flex-col w-full h-full justify-between items-center">
    <Row class="w-full h-[40%] flex items-start justify-center">
      <Col
        class="w-full h-full"
        :style="{
          backgroundColor: gridOption.backgroundColor
        }"
      >
        <TopsterGrid />
      </Col>
    </Row>
    <span accesskey="delete" class="w-full h-full flex items-center justify-center"
      >Delete to drag</span
    >
    <Row class="w-full h-[50%]">
      <div class="h-full w-[50%] overflow-y-auto bg-slate-800">
        <GridToolbar />
      </div>

      <div class="w-[50%] h-full overflow-y-auto">
        <SideSearchBarVue />
      </div>
    </Row>
  </article>
</template>
