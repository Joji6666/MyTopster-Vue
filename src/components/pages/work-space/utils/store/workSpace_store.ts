import { reactive } from 'vue'
import type {
  CustomGridDatasInterface,
  CustomGridOptionsInterface,
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
  gridGap: 1,
  isCustom: false
})

export const topsterDataStore = reactive<TopsterDatasInterface>({
  topsterDatas: []
})

export const gridDatasStore = reactive<GridDatasInterface>({
  gridDatas: []
})

export const customGridDatas = reactive<CustomGridDatasInterface>({
  customGridDatas: []
})

export const selectedImageStore = reactive<SelectedImageStoreInterface>({
  seletedImage: null,
  seletedGrid: null,
  isGridDrag: false
})

export const customGridOptions = reactive<CustomGridOptionsInterface>({
  largeTileCount: 0,
  middleTileCount: 0,
  smallTileCount: 0,
  row: 0,
  col: 0,
  type: 'onlySmall'
})
