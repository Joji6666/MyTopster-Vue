import axios from 'axios'
import html2canvas from 'html2canvas'
import { ref } from 'vue'

import {
  autoColumnsGridDatasStore,
  customGridDatas,
  customGridOptions,
  gridDatasStore,
  gridOptionStore,
  selectedImageStore,
  storageData
} from '../store/workSpace_store'
import type {
  GridDataInterface,
  GridOptionInterface,
  GridPropertiesInterface,
  StorageDataInterface
} from '../interface/workSpace_store_interface'
import type { SelectValue } from 'ant-design-vue/es/select'
import type { AlbumDataInterface } from '@/components/pages/work-space/utils/interface/interface'

interface AutoColumnGridSettingInterface {
  totalCount: number
  largeColCount: number
  middleColCount: number
  smallColCount: number
  largeRowCount: number
  middleRowCount: number
  smallRowCount: number
  largeCount: number
  middleCount: number
  smallCount: number
}

export default function useWorkSpace() {
  const apiKey = import.meta.env.VITE_API_URL

  // hooks

  // states
  const albumName = ref<string | undefined>('')
  const artist = ref<string | undefined>('')
  const searchData = ref<AlbumDataInterface[]>([])
  const gridType = ref<string | SelectValue>('basic')
  const gridOption: GridOptionInterface = gridOptionStore

  // values

  const gridTypeOptions = [
    { label: 'basic', value: 'basic' },
    { label: 'Top10', value: 'top10' },
    // { label: 'Top25', value: 'top25' },
    { label: 'Top50', value: 'top50' },
    { label: 'Top100', value: 'top100' },
    { label: 'Top100 Small Box', value: 'top100_small' },
    { label: 'Top50 Small Box', value: 'top50_small' },
    { label: 'Custom', value: 'custom' }
  ]

  const tooltipOptions = [
    { label: 'None', value: 'none' },
    { label: 'Side', value: 'side' },
    { label: 'Bottom', value: 'bottom' }
  ]

  // funtions

  const createGrids = (
    largeGridCount: number,
    middleGridCount: number,
    smallGridCount: number,
    largeGridCol: number,
    middleGridCol: number,
    smallGridCol: number,
    isAddWork: boolean = false
  ) => {
    const largeGridData: GridDataInterface = {
      col: largeGridCol,
      count: largeGridCount,
      grids: []
    }

    const middleGridData: GridDataInterface = {
      col: middleGridCol,
      count: middleGridCount,
      grids: []
    }

    const smallGridData: GridDataInterface = {
      col: smallGridCol,
      count: smallGridCount,
      grids: []
    }

    const totalCount = largeGridCount + middleGridCount + smallGridCount

    for (let index = 0; index < totalCount; index++) {
      if (index < largeGridData.count) {
        largeGridData.grids.push({
          width: 18,
          height: 18,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }
      if (index > largeGridData.count - 1 && index < largeGridData.count + middleGridData.count) {
        middleGridData.grids.push({
          width: 15,
          height: 15,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }

      if (index > largeGridData.count + middleGridData.count - 1) {
        smallGridData.grids.push({
          width: 8,
          height: 8,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }
    }

    if (!isAddWork) {
      gridDatasStore.gridDatas = [largeGridData, middleGridData, smallGridData]
    }

    return [largeGridData, middleGridData, smallGridData]
  }

  const autoColumnGridSetting = (option: AutoColumnGridSettingInterface) => {
    const gridDatas: GridDataInterface[] = []
    let totalCount: number = 0
    Object.entries(option).forEach(([key, value], entriIndex: number) => {
      if (key !== 'totalCount') {
        if (key.includes('Col')) {
          for (let index = 0; index < value; index++) {
            if (entriIndex === 1) {
              gridDatas.push({
                col: 5,
                count: 0,
                grids: [],
                type: 'large',
                width: '20%',
                height: '225px'
              })
            }

            if (entriIndex === 2) {
              gridDatas.push({
                col: 5,
                count: 0,
                grids: [],
                type: 'middle',
                width: '16.622%',
                height: '186px'
              })
            }

            if (entriIndex === 3) {
              gridDatas.push({
                col: 5,
                count: 0,
                grids: [],
                type: 'small',
                width: '9.83%',
                height: '110px'
              })
            }
          }
        }

        if (key.includes('Row')) {
          if (entriIndex === 4) {
            for (let index = 0; index < option.largeCount; index++) {
              gridDatas
                .find(
                  (data: GridDataInterface) =>
                    data.type === 'large' && data.grids.length < option.largeRowCount
                )
                ?.grids.push({
                  width: 0,
                  height: 0,
                  imagePath: '',
                  title: '',
                  key: `${totalCount}`,
                  artist: ''
                })
              totalCount++
            }
          }

          if (entriIndex === 5) {
            for (let index = 0; index < option.middleCount; index++) {
              gridDatas
                .find(
                  (data: GridDataInterface) =>
                    data.type === 'middle' && data.grids.length < option.middleRowCount
                )
                ?.grids.push({
                  width: 0,
                  height: 0,
                  imagePath: '',
                  title: '',
                  key: `${totalCount}`,
                  artist: ''
                })
              totalCount++
            }
          }

          if (entriIndex === 6) {
            for (let index = 0; index < option.smallCount; index++) {
              gridDatas
                .find(
                  (data: GridDataInterface) =>
                    data.type === 'small' && data.grids.length < option.smallRowCount
                )
                ?.grids.push({
                  width: 0,
                  height: 0,
                  imagePath: '',
                  title: '',
                  key: `${totalCount}`,
                  artist: ''
                })
              totalCount++
            }
          }
        }
      }
    })

    return gridDatas
  }

  const createAutoCoulmnsGrid = (type: string) => {
    switch (type) {
      case 'top10':
        {
          const option: AutoColumnGridSettingInterface = {
            totalCount: 10,
            largeColCount: 2,
            middleColCount: 0,
            smallColCount: 0,
            largeRowCount: 5,
            middleRowCount: 0,
            smallRowCount: 0,
            largeCount: 10,
            middleCount: 0,
            smallCount: 0
          }

          autoColumnsGridDatasStore.gridDatas = autoColumnGridSetting(option)
        }

        break

      case 'top25':
        {
          const option: AutoColumnGridSettingInterface = {
            totalCount: 25,
            largeColCount: 1,
            middleColCount: 2,
            smallColCount: 1,
            largeRowCount: 5,
            middleRowCount: 6,
            smallRowCount: 10,
            largeCount: 5,
            middleCount: 10,
            smallCount: 10
          }

          autoColumnsGridDatasStore.gridDatas = autoColumnGridSetting(option)
        }

        break

      case 'top50_small':
        {
          const option: AutoColumnGridSettingInterface = {
            totalCount: 50,
            largeColCount: 0,
            middleColCount: 0,
            smallColCount: 5,
            largeRowCount: 0,
            middleRowCount: 0,
            smallRowCount: 10,
            largeCount: 0,
            middleCount: 0,
            smallCount: 50
          }

          autoColumnsGridDatasStore.gridDatas = autoColumnGridSetting(option)
        }

        break

      default:
        break
    }
  }

  const gridInit = () => {
    createGrids(10, 12, 20, 5, 6, 10)
  }

  const handleChange = (e: any, key: string) => {
    switch (key) {
      case 'album':
        albumName.value = e.target.value
        break
      case 'artist':
        artist.value = e.target.value

        break
      default:
        break
    }
  }

  const handleSelect = (e: SelectValue, key: string) => {
    gridType.value = e
    gridOptionStore.isCustom = false
    gridOptionStore.isAutoColumnsGrid = false
    if (e && typeof e === 'string') {
      gridOptionStore.gridType = e
    }

    switch (e) {
      case 'basic':
        createGrids(10, 12, 20, 5, 6, 10)

        break

      case 'top10':
        createAutoCoulmnsGrid(e)
        gridOptionStore.isAutoColumnsGrid = true
        break

      case 'top25':
        createAutoCoulmnsGrid(e)

        gridOptionStore.isAutoColumnsGrid = true

        break

      case 'top50':
        createGrids(12, 18, 20, 4, 6, 10)

        break

      case 'top100':
        createGrids(10, 30, 60, 5, 6, 10)

        break

      case 'top100_small':
        createGrids(0, 0, 100, 5, 6, 10)

        break

      case 'top50_small':
        createAutoCoulmnsGrid(e)
        gridOptionStore.isAutoColumnsGrid = true

        break

      case 'custom':
        customGridOptions.type = 'onlySmall'
        gridOptionStore.isCustom = true
        customGridDatas.customGridDatas.push({
          col: 10,
          count: 0,
          grids: [
            { width: '9.83%', height: '110px', imagePath: '', title: '', key: `0`, artist: '' }
          ],
          width: '9.83%',
          height: '110px'
        })

        break

      default:
        break
    }
  }

  const handleTooltip = (e: SelectValue) => {
    if (e && typeof e === 'string') {
      gridOptionStore.tooltipOption = e

      if (e === 'side' && gridOptionStore.isCustom) {
        customGridDatas.customGridDatas.forEach((gridData: GridDataInterface) => {
          if (gridData.type === 'small') {
            gridData.width = '9.77%'
          }
        })
      }

      if (e !== 'side' && gridOptionStore.isCustom) {
        customGridDatas.customGridDatas.forEach((gridData: GridDataInterface) => {
          if (gridData.type === 'small') {
            gridData.width = '9.83%'
          }
        })
      }
    }
  }

  const handleSearch = async () => {
    const res = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumName.value}&api_key=${apiKey}&format=json`
    )
    if (res) {
      console.log(res, 'res !@')
      searchData.value = res.data.results.albummatches.album
    }
  }

  const handleColor = (e: any, key: string) => {
    switch (key) {
      case 'background':
        gridOption.backgroundColor = e.target.value

        break

      case 'tooltip':
        gridOption.tooltipBackgroundColor = e.target.value

        break

      case 'text':
        gridOption.textColor = e.target.value

        break

      default:
        break
    }
  }

  const handleDragOn = (image: AlbumDataInterface) => {
    selectedImageStore.seletedImage = image
  }

  const handleDelete = () => {
    const targetDatas = gridOptionStore.isAutoColumnsGrid
      ? autoColumnsGridDatasStore.gridDatas
      : gridOptionStore.isCustom
        ? customGridDatas.customGridDatas
        : gridDatasStore.gridDatas

    targetDatas.forEach((gridData: GridDataInterface) => {
      const foundTile = gridData.grids.find(
        (grid: GridPropertiesInterface) => grid.key === selectedImageStore.seletedGrid?.key
      )

      if (foundTile) {
        foundTile.artist = ''
        foundTile.imagePath = ''
        foundTile.title = ''
      }
    })
  }

  const handleDragEnd = (e: any) => {
    const accessKey = e.target.accessKey
    const targetDatas = gridOptionStore.isCustom
      ? customGridDatas.customGridDatas
      : gridOptionStore.isAutoColumnsGrid
        ? autoColumnsGridDatasStore.gridDatas
        : gridDatasStore.gridDatas

    targetDatas.forEach((gridData: GridDataInterface) => {
      const foundTile = gridData.grids.find(
        (grid: GridPropertiesInterface) => grid.key === accessKey
      )

      if (selectedImageStore.isGridDrag) {
        if (foundTile && selectedImageStore.seletedGrid) {
          const tempFoundTile = { ...foundTile }

          foundTile.imagePath = selectedImageStore.seletedGrid.imagePath
          foundTile.title = selectedImageStore.seletedGrid.title
          foundTile.artist = selectedImageStore.seletedGrid.artist

          if (foundTile.imagePath) {
            targetDatas.forEach((gridData: GridDataInterface) => {
              const prevGrid = gridData.grids.find(
                (grid: GridPropertiesInterface) => grid.key === selectedImageStore.seletedGrid?.key
              )

              if (prevGrid) {
                prevGrid.imagePath = tempFoundTile.imagePath
                prevGrid.title = tempFoundTile.title
                prevGrid.artist = tempFoundTile.artist
              }
            })
          }
        }
      } else {
        if (foundTile && selectedImageStore.seletedImage) {
          foundTile.imagePath = selectedImageStore.seletedImage.image[3]['#text']
          foundTile.title = selectedImageStore.seletedImage.name
          foundTile.artist = selectedImageStore.seletedImage.artist
        }

        const files = e.dataTransfer.files

        if (files.length > 0 && files[0].type.startsWith('image/') && foundTile) {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(files[0])
          fileReader.onload = (e: any) => {
            if (e) {
              foundTile.imagePath = e.target.result
              foundTile.title = files[0].name
            }
          }
        }
      }
    })

    selectedImageStore.seletedGrid = null
    selectedImageStore.seletedImage = null
    selectedImageStore.isGridDrag = false
  }

  const handleGridDrag = (grid: GridPropertiesInterface) => {
    selectedImageStore.seletedGrid = grid
    selectedImageStore.isGridDrag = true
  }

  const handleGridGap = (value: any) => {
    gridOption.gridGap = value
  }

  const handleClear = () => {
    if (gridOptionStore.isAutoColumnsGrid) {
      autoColumnsGridDatasStore.gridDatas = []
    }

    if (gridOptionStore.isCustom) {
      customGridDatas.customGridDatas = []
    }

    if (!gridOptionStore.isAutoColumnsGrid && !gridOptionStore.isCustom) {
      gridDatasStore.gridDatas = []
    }

    const targetStorageData = storageData.storageData.find(
      (data: StorageDataInterface) => data.name === gridOptionStore.selectedWork
    )

    if (targetStorageData) {
      targetStorageData.gridDatas = []

      localStorage.setItem('datas', JSON.stringify(storageData.storageData))
    }
  }

  const downloadImage = async (key: string) => {
    const captureArea: HTMLElement | null = gridOptionStore.isCustom
      ? document.querySelector('#customCaptureArea')
      : gridOptionStore.isAutoColumnsGrid
        ? document.querySelector('#autoColumnCaptureArea')
        : document.querySelector('#captureArea')
    const type = key === 'png' ? 'image/png' : 'image/jpeg'

    if (captureArea) {
      const originalHeight = captureArea.style.height

      if (gridOption.tooltipOption !== 'side') {
        captureArea.style.height = 'auto'
      }

      const canvas = await html2canvas(captureArea, { allowTaint: true, useCORS: true })
      const image = canvas.toDataURL(type)
      const link = document.createElement('a')
      link.download = 'captured-image'
      link.href = image
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      captureArea.style.height = originalHeight
    }
  }

  const handleBackgroundImage = (e: any) => {
    const files = e.target.files

    if (files.length > 0) {
      if (files.length > 0) {
        const objectURL = URL.createObjectURL(files[0])

        gridOptionStore.backgroundImagePath = objectURL
      }
    }
  }

  return {
    albumName,
    artist,
    searchData,
    gridOption,
    gridType,
    gridTypeOptions,
    tooltipOptions,
    gridInit,
    handleChange,
    handleSearch,
    handleDragOn,
    handleDragEnd,
    handleSelect,
    handleColor,
    handleTooltip,
    handleGridDrag,
    handleGridGap,
    handleDelete,
    handleClear,
    handleBackgroundImage,
    createGrids,
    downloadImage
  }
}
