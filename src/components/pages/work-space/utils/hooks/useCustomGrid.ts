import type { SelectValue } from 'ant-design-vue/es/select'
import { customGridDatas, customGridOptions } from '../store/workSpace_store'
import type { GridDataInterface } from '../interface/workSpace_store_interface'

const useCustomGrid = () => {
  const handleCustomGridType = (e: SelectValue) => {
    if (e) {
      customGridOptions.type = e
    }
  }

  const handleCustomGridTiles = (e: any, type: string) => {
    const prevLargeTileCount = structuredClone(customGridOptions.largeTileCount)
    const prevMiddleTileCount = structuredClone(customGridOptions.middleTileCount)
    const prevSmallTileCount = structuredClone(customGridOptions.smallTileCount)

    switch (type) {
      case 'large':
        {
          customGridOptions.largeTileCount = e

          const customLargeGridData = customGridDatas.customGridDatas.find(
            (gridData: GridDataInterface) => gridData.type === 'large'
          )

          if (e > prevLargeTileCount) {
            customLargeGridData?.grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${customLargeGridData.grids.length + 1}`,
              artist: ''
            })
          } else {
            customLargeGridData?.grids.pop()
          }
        }

        break

      case 'middle':
        {
          customGridOptions.middleTileCount = e

          const customMiddleGridData = customGridDatas.customGridDatas.find(
            (gridData: GridDataInterface) => gridData.type === 'middle'
          )

          if (e > prevMiddleTileCount) {
            customMiddleGridData?.grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${customMiddleGridData.grids.length + 1}`,
              artist: ''
            })
          } else {
            customMiddleGridData?.grids.pop()
          }
        }

        break

      case 'small':
        {
          customGridOptions.smallTileCount = e

          const customSmallGridData = customGridDatas.customGridDatas.find(
            (gridData: GridDataInterface) => gridData.type === 'small'
          )

          if (e > prevSmallTileCount) {
            customSmallGridData?.grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${customSmallGridData.grids.length + 1}`,
              artist: ''
            })
          } else {
            customSmallGridData?.grids.pop()
          }
        }

        break

      default:
        break
    }
  }

  const handleCustomGridRowAndCol = (e: any, type: string) => {
    const prevRow = structuredClone(customGridOptions.row)
    const prevCol = structuredClone(customGridOptions.col)

    if (type === 'row') {
      customGridOptions.row = e

      if (e > prevRow) {
        customGridDatas.customGridDatas.push({
          col: 10,
          count: 0,
          grids: []
        })

        for (let index = 0; index < prevCol; index++) {
          customGridDatas.customGridDatas[customGridDatas.customGridDatas.length - 1].grids.push({
            width: 0,
            height: 0,
            imagePath: '',
            title: '',
            key: `${1}`,
            artist: ''
          })
        }
      } else {
        customGridDatas.customGridDatas.pop()
      }
    } else {
      customGridOptions.col = e

      if (e > prevCol) {
        customGridDatas.customGridDatas.forEach((gridData) => {
          gridData.grids.push({
            width: 0,
            height: 0,
            imagePath: '',
            title: '',
            key: `${gridData.grids.length + 1}`,
            artist: ''
          })
        })
      } else {
        customGridDatas.customGridDatas.forEach((gridData) => {
          gridData.grids.pop()
        })
      }
    }
  }

  return {
    handleCustomGridType,
    handleCustomGridTiles,
    handleCustomGridRowAndCol
  }
}

export default useCustomGrid
