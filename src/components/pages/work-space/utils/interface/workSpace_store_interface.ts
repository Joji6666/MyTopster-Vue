import type { AlbumDataInterface } from './interface'

export interface GridOptionInterface {
  backgroundColor: string
  tileLimit: number
  gridType: string
  tooltipOption: string
  tooltipBackgroundColor: string
  textColor: string
}

export interface GridPropertiesInterface {
  width: number | string
  height: number | string
  imagePath: string | undefined
  title: string | undefined
  key: string
  artist: string
}

export interface GridDatasInterface {
  gridDatas: GridPropertiesInterface[]
}

export interface TopsterDatasInterface {
  topsterDatas: AlbumDataInterface[]
}

export interface SelectedImageStoreInterface {
  seletedImage: AlbumDataInterface | null
}
