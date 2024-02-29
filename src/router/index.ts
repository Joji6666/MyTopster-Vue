import MainView from '@/views/MainView.vue'
import NoticeView from '@/views/NoticeView.vue'
import RankingView from '@/views/RankingView.vue'
import TutorialView from '@/views/TutorialView.vue'
import WorkSpaceView from '@/views/WorkSpaceView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/notice',
      name: 'notice',
      component: NoticeView
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: RankingView
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: TutorialView
    },
    {
      path: '/work-space',
      name: 'work-space',
      component: WorkSpaceView
    }
  ]
})

export default router
