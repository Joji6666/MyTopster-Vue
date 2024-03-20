<script setup lang="ts">
import { Row, Col } from 'ant-design-vue'
import SideSearchBarVue from './SideSearchBar.vue'
import TopsterGrid from './TopsterGrid.vue'
import GridToolbar from './GridToolbar.vue'
</script>

<template>
  <article class="flex w-full h-full justify-between items-center">
    <Row class="w-full h-full flex items-start justify-center" :gutter="6">
      <Col class="h-full w-[19%] fixed left-0 z-20">
        <GridToolbar />
      </Col>

      <Col class="w-[62%] h-auto">
        <TopsterGrid />
      </Col>
      <Col class="w-[19%] h-full fixed right-0 z-20">
        <SideSearchBarVue />
      </Col>
    </Row>
  </article>
</template>
