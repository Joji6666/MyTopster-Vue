import axios from 'axios'
import html2canvas from 'html2canvas'
import { computed, ref } from 'vue'

import {
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
    { label: 'Top30', value: 'top30' },
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
    switch (e) {
      case 'basic':
        createGrids(10, 12, 20, 5, 6, 10)

        break

      case 'top10':
        createGrids(10, 0, 0, 5, 6, 10)

        break

      case 'top30':
        createGrids(12, 18, 0, 4, 6, 10)

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
        createGrids(0, 0, 50, 5, 6, 10)

        break

      case 'custom':
        customGridOptions.type = 'onlySmall'
        gridOptionStore.isCustom = true
        break

      default:
        break
    }
  }

  const handleTooltip = (e: SelectValue) => {
    console.log(e, 'e @@@@@@')

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
    gridDatasStore.gridDatas.forEach((gridData: GridDataInterface) => {
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
    const targetDatas = !gridOptionStore.isCustom
      ? gridDatasStore.gridDatas
      : customGridDatas.customGridDatas

    console.log(gridOptionStore.isCustom, targetDatas)

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

    console.log(targetDatas, 'target Datas @@')
  }

  const handleGridDrag = (grid: GridPropertiesInterface) => {
    selectedImageStore.seletedGrid = grid
    selectedImageStore.isGridDrag = true
  }

  const handleGridGap = (value: any) => {
    gridOption.gridGap = value
  }

  const handleClear = () => {
    handleSelect(gridType.value, 'clear')
  }

  const downloadImage = async (key: string) => {
    const captureArea: HTMLElement | null = gridOptionStore.isCustom
      ? document.querySelector('#customCaptureArea')
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
    createGrids,
    downloadImage
  }
}
