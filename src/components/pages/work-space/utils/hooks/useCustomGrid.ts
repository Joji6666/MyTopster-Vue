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

          const customMiddleGridDatas = customGridDatas.customGridDatas.filter(
            (gridData: GridDataInterface) => gridData.type === 'middle'
          )

          if (customMiddleGridDatas.length === 0) {
            const customLargeGridDatas = customGridDatas.customGridDatas.filter(
              (gridData: GridDataInterface) => gridData.type === 'large'
            )
            customGridDatas.customGridDatas.splice(customLargeGridDatas.length, 0, {
              col: 5,
              count: 0,
              grids: [],
              type: 'middle',
              width: '16.622%',
              height: '186px'
            })

            customGridDatas.customGridDatas[customLargeGridDatas.length].grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })
          }

          const lastIndex = customMiddleGridDatas.length - 1
          const targetMiddleGridData = customMiddleGridDatas[lastIndex]

          if (targetMiddleGridData.grids.length === 5 && e > prevMiddleTileCount) {
            const customLargeGridDatas = customGridDatas.customGridDatas.filter(
              (gridData: GridDataInterface) => gridData.type === 'large'
            )
            customGridDatas.customGridDatas.splice(lastIndex + 1 + customLargeGridDatas.length, 0, {
              col: 5,
              count: 0,
              grids: [],
              type: 'middle',
              width: '16.622%',
              height: '186px'
            })

            customMiddleGridDatas[customMiddleGridDatas.length - 1].grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })

            return
          }

          if (e > prevMiddleTileCount) {
            targetMiddleGridData?.grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })
          } else {
            customMiddleGridDatas[customMiddleGridDatas.length - 1].grids.pop()

            if (targetMiddleGridData.grids.length === 0) {
              const filteredGridDatas = customGridDatas.customGridDatas.filter(
                (gridData: GridDataInterface) => gridData.grids.length !== 0
              )

              customGridDatas.customGridDatas = filteredGridDatas
            }
          }
        }

        break

      case 'small':
        {
          customGridOptions.smallTileCount = e

          const customSmallGridDatas = customGridDatas.customGridDatas.filter(
            (gridData: GridDataInterface) => gridData.type === 'small'
          )

          if (customSmallGridDatas.length === 0) {
            const customMiddleGridDatas = customGridDatas.customGridDatas.filter(
              (gridData: GridDataInterface) => gridData.type === 'middle'
            )

            const customLargeGridDatas = customGridDatas.customGridDatas.filter(
              (gridData: GridDataInterface) => gridData.type === 'large'
            )

            customGridDatas.customGridDatas.splice(
              customMiddleGridDatas.length + customLargeGridDatas.length,
              0,
              {
                col: 5,
                count: 0,
                grids: [],
                type: 'small',
                width: '9.83%',
                height: '110px'
              }
            )

            customGridDatas.customGridDatas[
              customMiddleGridDatas.length + customLargeGridDatas.length
            ].grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })
          }

          const lastIndex = customSmallGridDatas.length - 1
          const targetSmallGridData = customSmallGridDatas[lastIndex]

          if (targetSmallGridData.grids.length === 9 && e > prevSmallTileCount) {
            const customMiddleGridDatas = customGridDatas.customGridDatas.filter(
              (gridData: GridDataInterface) => gridData.type === 'middle'
            )

            const customLargeGridDatas = customGridDatas.customGridDatas.filter(
              (gridData: GridDataInterface) => gridData.type === 'large'
            )

            customGridDatas.customGridDatas.splice(
              lastIndex + 1 + customMiddleGridDatas.length + customLargeGridDatas.length,
              0,
              {
                col: 5,
                count: 0,
                grids: [],
                type: 'small',
                width: '9.83%',
                height: '110px'
              }
            )

            customSmallGridDatas[customSmallGridDatas.length - 1].grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })

            return
          }

          if (e > prevSmallTileCount) {
            targetSmallGridData?.grids.push({
              width: 0,
              height: 0,
              imagePath: '',
              title: '',
              key: `${totalCount}`,
              artist: ''
            })
          } else {
            customSmallGridDatas[customSmallGridDatas.length - 1].grids.pop()

            if (targetSmallGridData.grids.length === 0) {
              const filteredGridDatas = customGridDatas.customGridDatas.filter(
                (gridData: GridDataInterface) => gridData.grids.length !== 0
              )

              customGridDatas.customGridDatas = filteredGridDatas
            }
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

    console.log(e, 'e@@', prevRow, 'prevRow', prevCol, 'prev Col@', type, 'type@')

    if (type === 'row') {
      customGridOptions.row = e

      if (e > prevRow - 1) {
        customGridDatas.customGridDatas.push({
          col: 10,
          count: 0,
          grids: [],
          width: '9.83%',
          height: '110px'
        })

        for (let index = 0; index < prevCol; index++) {
          customGridDatas.customGridDatas[customGridDatas.customGridDatas.length - 1].grids.push({
            width: 0,
            height: 0,
            imagePath: '',
            title: '',
            key: ``,
            artist: ''
          })
        }
      } else {
        customGridDatas.customGridDatas.pop()
      }
    } else {
      customGridOptions.col = e

      if (e > prevCol - 1) {
        customGridDatas.customGridDatas.forEach((gridData) => {
          gridData.grids.push({
            width: 0,
            height: 0,
            imagePath: '',
            title: '',
            key: ``,
            artist: ''
          })
        })
      } else {
        customGridDatas.customGridDatas.forEach((gridData) => {
          gridData.grids.pop()
        })
      }
    }

    let gridTotalCount: number = 0

    customGridDatas.customGridDatas.forEach((gridData: GridDataInterface) => {
      gridData.grids.forEach((grid) => {
        grid.key = gridTotalCount.toString()
        gridTotalCount++
      })
    })
  }

  return {
    handleCustomGridType,
    handleCustomGridTiles,
    handleCustomGridRowAndCol
  }
}

export default useCustomGrid
