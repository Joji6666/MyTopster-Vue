import type { SelectValue } from 'ant-design-vue/es/select'
import type { AlbumDataInterface } from './interface'

export interface GridOptionInterface {
  [key: string]: string | number | boolean | null
  backgroundColor: string
  tileLimit: number
  gridType: string
  tooltipOption: string
  tooltipBackgroundColor: string
  textColor: string
  gridGap: number
  isCustom: boolean
  selectedWork: string
  backgroundImagePath: string
  isAutoColumnsGrid: boolean
  backgroundImageFile: any
}

export interface GridPropertiesInterface {
  width: number | string
  height: number | string
  imagePath: string | undefined
  title: string | undefined
  key: string
  artist: string
}

export interface GridDataInterface {
  col: number
  count: number
  grids: GridPropertiesInterface[]
  type?: string
  width?: number | string
  height?: number | string
}

export interface GridDatasInterface {
  gridDatas: GridDataInterface[]
}

export interface AutoColumnGridDatasInterface {
  gridDatas: GridDataInterface[]
}

export interface StorageDataInterface {
  name: string
  gridDatas: GridDataInterface[]
  options: GridOptionInterface
  customOptions: CustomGridOptionsInterface
}

export interface StorageDatasInterface {
  storageData: StorageDataInterface[]
}

export interface CustomGridDatasInterface {
  customGridDatas: GridDataInterface[]
}

export interface TopsterDatasInterface {
  topsterDatas: AlbumDataInterface[]
}

export interface SelectedImageStoreInterface {
  seletedImage: AlbumDataInterface | null
  seletedGrid: GridPropertiesInterface | null
  isGridDrag: boolean
}

export interface CustomGridOptionsInterface {
  [key: string]: string | number | boolean | SelectValue
  largeTileCount: number
  middleTileCount: number
  smallTileCount: number
  row: number
  col: number
  type: string | SelectValue
}

export interface MobileSelectedImageInterface {
  data: AlbumDataInterface | null
  x: string | number
  y: string | number
  lastTouchX: number
  lastTouchY: number
  isEnd: boolean
}
