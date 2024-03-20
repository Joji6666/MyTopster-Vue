import { gridDatasStore } from '../store/workSpace_store'
import type {
  GridDataInterface,
  GridPropertiesInterface
} from '../interface/workSpace_store_interface'

export default function useGridType() {
  const createGrids = (
    tileLimit: number,
    largeGridData: GridDataInterface,
    middleGridData: GridDataInterface,
    smallGridData: GridDataInterface
  ) => {
    const largeTiles: GridPropertiesInterface[] = []
    const middleTiles: GridPropertiesInterface[] = []
    const smallTiles: GridPropertiesInterface[] = []

    largeGridData.grids = largeTiles
    middleGridData.grids = middleTiles
    smallGridData.grids = smallTiles

    for (let index = 0; index < tileLimit; index++) {
      if (index < largeGridData.count) {
        largeTiles.push({
          width: 18,
          height: 18,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }
      if (index > largeGridData.count - 1 && index < largeGridData.count + middleGridData.count) {
        middleTiles.push({
          width: 15,
          height: 15,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }

      if (index > largeGridData.count + middleGridData.count - 1) {
        smallTiles.push({
          width: 8,
          height: 8,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }
    }
    gridDatasStore.gridDatas = [largeGridData, middleGridData, smallGridData]
  }

  const renderBasicType = () => {
    const tileLimit = 42

    const largeGridData: GridDataInterface = {
      col: 5,
      count: 10,
      grids: []
    }

    const middleGridData: GridDataInterface = {
      col: 6,
      count: 12,
      grids: []
    }

    const smallGridData: GridDataInterface = {
      col: 10,
      count: 20,
      grids: []
    }

    createGrids(tileLimit, largeGridData, middleGridData, smallGridData)
  }

  const renderTop10 = () => {
    const tileLimit = 10

    const largeGridData: GridDataInterface = {
      col: 5,
      count: 10,
      grids: []
    }

    const middleGridData: GridDataInterface = {
      col: 6,
      count: 12,
      grids: []
    }

    const smallGridData: GridDataInterface = {
      col: 10,
      count: 20,
      grids: []
    }

    createGrids(tileLimit, largeGridData, middleGridData, smallGridData)
  }

  return { renderBasicType, renderTop10 }
}
