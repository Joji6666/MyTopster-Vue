import { reactive } from 'vue'
import type { GridOptionInterface } from './workSpace_store_interface'
import type { AlbumDataInterface } from '@/utils/interface'

export const gridOptionStore = reactive<GridOptionInterface>({
  backgroundColor: '',
  tileLimit: 20
})

export const topsterDataStore = reactive<AlbumDataInterface[]>([])
