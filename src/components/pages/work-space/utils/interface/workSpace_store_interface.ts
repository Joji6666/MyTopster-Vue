import type { SelectValue } from 'ant-design-vue/es/select'
import type { AlbumDataInterface } from './interface'

export interface GridOptionInterface {
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
  largeTileCount: number
  middleTileCount: number
  smallTileCount: number
  row: number
  col: number
  type: string | SelectValue
}
