import { reactive } from 'vue'
import type {
  AutoColumnGridDatasInterface,
  CustomGridDatasInterface,
  CustomGridOptionsInterface,
  GridDatasInterface,
  GridOptionInterface,
  MobileSelectedImageInterface,
  SelectedImageStoreInterface,
  StorageDatasInterface,
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
  isCustom: false,
  selectedWork: 'work1',
  backgroundImagePath: '',
  isAutoColumnsGrid: false,
  backgroundImageFile: null
})

export const topsterDataStore = reactive<TopsterDatasInterface>({
  topsterDatas: []
})

export const gridDatasStore = reactive<GridDatasInterface>({
  gridDatas: []
})

export const autoColumnsGridDatasStore = reactive<AutoColumnGridDatasInterface>({
  gridDatas: []
})

export const storageData = reactive<StorageDatasInterface>({
  storageData: []
})

export const customGridDatas = reactive<CustomGridDatasInterface>({
  customGridDatas: []
})

export const selectedImageStore = reactive<SelectedImageStoreInterface>({
  seletedImage: null,
  seletedGrid: null,
  isGridDrag: false
})

export const isMobile = reactive({
  isMobile: false
})

export const customGridOptions = reactive<CustomGridOptionsInterface>({
  largeTileCount: 0,
  middleTileCount: 0,
  smallTileCount: 0,
  row: 0,
  col: 0,
  type: 'onlySmall'
})

export const mobileSelectedImage = reactive<MobileSelectedImageInterface>({
  data: null,
  x: 0,
  y: 0,
  lastTouchX: 0,
  lastTouchY: 0,
  isEnd: false
})
