import type { AlbumDataInterface } from './interface'

export interface GridOptionInterface {
  backgroundColor: string
  tileLimit: number
  gridType: string
  tooltipOption: string
  tooltipBackgroundColor: string
  textColor: string
  gridGap: number
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
}

export interface GridDatasInterface {
  gridDatas: GridDataInterface[]
}

export interface TopsterDatasInterface {
  topsterDatas: AlbumDataInterface[]
}

export interface SelectedImageStoreInterface {
  seletedImage: AlbumDataInterface | null
  seletedGrid: GridPropertiesInterface | null
  isGridDrag: boolean
}
