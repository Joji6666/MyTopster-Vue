<script setup lang="ts">
import { Row, Col } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const MENU_LIST = ['Notice', 'Ranking', 'Tutorial']

const router = useRouter()
</script>

<template class="w-screen">
  <header class="w-screen bg-slate-950">
    <div class="w-full bg-slate-950 fixed z-50">
      <h2
        class="flex items-center justify-center md:pt-0 w-full md:text-[55px] text-[50px] bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
      >
        My Topster
      </h2>
    </div>

    <!-- <Row class="w-full h-[80px] flex">
      <img
        @click="router.push(`/`)"
        src="../../../public/logo.png"
        width="80px"
        height="80px"
        class="cursor-pointer absolute top-0 left-0 z-50"
      />
      <Col span="24" class="flex w-full items-center justify-center">
        <div class="flex space-x-[100px] w-full items-center justify-center">
          <span
            @click="router.push(`/${menu}`)"
            v-for="(menu, index) in MENU_LIST"
            :key="index"
            class="flex hover:text-blue-500 cursor-pointer"
          >
            {{ menu }}
          </span>
        </div>
      </Col>
    </Row> -->
  </header>
</template>
