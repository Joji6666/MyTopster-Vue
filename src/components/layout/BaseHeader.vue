<script setup lang="ts">
import { Row, Col, Button } from 'ant-design-vue'

const MENU_LIST = ['notice', 'board', 'tutorial']
</script>

<template class="w-screen">
  <header class="w-screen">
    <Row class="w-full h-[80px] flex">
      <Col span="24" class="flex w-full">
        <img src="../../../public/logo.png" width="80px" height="80px" />
        <div class="flex space-x-2 w-full">
          <span v-for="(menu, index) in MENU_LIST" :key="index" class="flex p-1">
            {{ menu }}
          </span>
        </div>
      </Col>
    </Row>
  </header>
</template>
