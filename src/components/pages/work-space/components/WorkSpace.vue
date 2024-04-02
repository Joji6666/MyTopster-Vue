<script setup lang="ts">
import { Row, Col } from 'ant-design-vue'
import SideSearchBarVue from './SideSearchBar.vue'
import TopsterGrid from './TopsterGrid.vue'
import GridToolbar from './GridToolbar.vue'

import useWorkSpace from '../utils/hooks/useWorkSpace'
import { onMounted } from 'vue'
import { isMobile } from '../utils/store/workSpace_store'

const { gridOption } = useWorkSpace()

onMounted(() => {
  const width = window.innerWidth

  if (width < 640) {
    isMobile.isMobile = true
  } else {
    isMobile.isMobile = false
  }

  window.addEventListener('resize', function () {
    const width = window.innerWidth

    if (width < 640) {
      isMobile.isMobile = true
    } else {
      isMobile.isMobile = false
    }
  })
})
</script>

<template>
  <article class="flex w-full h-full justify-between items-center">
    <Row class="w-full h-full flex items-start justify-center" :gutter="6">
      <Col class="h-full w-[19%] fixed left-0 z-20">
        <GridToolbar />
      </Col>

      <Col
        class="w-[62%] h-full"
        :style="{
          backgroundColor: gridOption.backgroundColor
        }"
      >
        <TopsterGrid />
      </Col>
      <Col class="w-[19%] h-full fixed right-0 z-20">
        <SideSearchBarVue />
      </Col>
    </Row>
  </article>
</template>
