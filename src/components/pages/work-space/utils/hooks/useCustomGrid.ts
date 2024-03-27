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

    let totalCount = 0

    customGridDatas.customGridDatas.forEach((gridData: GridDataInterface) => {
      totalCount += gridData.grids.length
    })

    switch (type) {
      case 'large':
        {
          customGridOptions.largeTileCount = e

          const customLargeGridDatas = customGridDatas.customGridDatas.filter(
            (gridData: GridDataInterface) => gridData.type === 'large'
          )

          if (customLargeGridDatas.length === 0) {
            customGridDatas.customGridDatas.splice(0, 0, {
              col: 5,
              count: 0,
              grids: [],
              type: 'large',
              width: '20%',
              height: '225px'
            })

            customGridDatas.customGridDatas[0].grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })
          }

          const lastIndex = customLargeGridDatas.length - 1
          const targetLargeGridData = customLargeGridDatas[lastIndex]

          if (targetLargeGridData.grids.length === 4 && e > prevLargeTileCount) {
            customGridDatas.customGridDatas.splice(lastIndex + 1, 0, {
              col: 5,
              count: 0,
              grids: [],
              type: 'large',
              width: '20%',
              height: '225px'
            })

            customLargeGridDatas[customLargeGridDatas.length - 1].grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })

            return
          }

          if (e > prevLargeTileCount) {
            targetLargeGridData?.grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })
          } else {
            customLargeGridDatas[customLargeGridDatas.length - 1].grids.pop()

            console.log(targetLargeGridData)

            if (targetLargeGridData.grids.length === 0) {
              const filteredGridDatas = customGridDatas.customGridDatas.filter(
                (gridData: GridDataInterface) => gridData.grids.length !== 0
              )

              customGridDatas.customGridDatas = filteredGridDatas
            }
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
              key: `${totalCount}`,
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
              key: `${totalCount}`,
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
    let totalCount = 0

    customGridDatas.customGridDatas.forEach((gridData: GridDataInterface) => {
      totalCount += gridData.grids.length
    })
    if (type === 'col') {
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
            key: `${totalCount}`,
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
            key: `${totalCount}`,
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
