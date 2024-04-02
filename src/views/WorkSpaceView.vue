<script setup lang="ts">
import WorkSpace from '@/components/pages/work-space/components/WorkSpace.vue'
import WorkSpaceMobile from '@/components/pages/work-space/components/mobile/WorkSpaceMobile.vue'

import { isMobile } from '@/components/pages/work-space/utils/store/workSpace_store'
</script>

<template>
  <article class="w-full h-full">
    <WorkSpaceMobile v-if="isMobile.isMobile" />
    <WorkSpace v-if="!isMobile.isMobile" />
  </article>
</template>
