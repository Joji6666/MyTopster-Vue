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
  gridType: 'type1',
  tooltipOption: 'none',
  tooltipBackgroundColor: '#000000',
  textColor: '#ffffff'
})

export const topsterDataStore = reactive<TopsterDatasInterface>({
  topsterDatas: []
})

export const gridDatasStore = reactive<GridDatasInterface>({
  gridDatas: []
})

export const selectedImageStore = reactive<SelectedImageStoreInterface>({
  seletedImage: null
})
