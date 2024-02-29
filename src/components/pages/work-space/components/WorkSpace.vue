<script setup lang="ts">
import { Row, Col } from 'ant-design-vue'
import SideSearchBarVue from './SideSearchBar.vue'
import TopsterGrid from './TopsterGrid.vue'
import GridToolbar from './GridToolbar.vue'
</script>

<template>
  <article class="flex w-full h-full justify-between items-center">
    <Row class="w-full h-full flex" :gutter="6">
      <Col span="4" class="h-full">
        <GridToolbar />
      </Col>

      <Col span="14" class="h-full">
        <TopsterGrid />
      </Col>
      <Col span="6" class="h-full">
        <SideSearchBarVue />
      </Col>
    </Row>
  </article>
</template>
