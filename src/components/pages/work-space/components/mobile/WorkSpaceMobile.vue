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
    <Row class="w-full h-[45%] flex items-start justify-center">
      <Col
        class="w-full h-full"
        :style="{
          backgroundColor: gridOption.backgroundColor
        }"
      >
        <TopsterGrid />
      </Col>
    </Row>

    <Row class="w-full h-[55%]">
      <div class="h-full w-[50%]">
        <GridToolbar />
      </div>

      <div class="w-[50%] h-full">
        <SideSearchBarVue />
      </div>
    </Row>
  </article>
</template>

