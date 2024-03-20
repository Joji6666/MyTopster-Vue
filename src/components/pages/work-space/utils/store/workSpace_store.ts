import { reactive } from 'vue'
import type {
  GridDatasInterface,
  GridOptionInterface,
  SelectedImageStoreInterface,
  TopsterDatasInterface
} from '../interface/workSpace_store_interface'

export const gridOptionStore = reactive<GridOptionInterface>({
  backgroundColor: '#000000',
  tileLimit: 42,
  gridType: 'basic',
  tooltipOption: 'none',
  tooltipBackgroundColor: '#000000',
  textColor: '#ffffff',
  gridGap: 1
})

export const topsterDataStore = reactive<TopsterDatasInterface>({
  topsterDatas: []
})

export const gridDatasStore = reactive<GridDatasInterface>({
  gridDatas: []
})

export const selectedImageStore = reactive<SelectedImageStoreInterface>({
  seletedImage: null,
  seletedGrid: null,
  isGridDrag: false
})
