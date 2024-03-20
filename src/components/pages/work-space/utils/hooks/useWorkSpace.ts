import axios from 'axios'
import html2canvas from 'html2canvas'
import { ref } from 'vue'

import { gridDatasStore, gridOptionStore, selectedImageStore } from '../store/workSpace_store'
import type {
  GridDataInterface,
  GridOptionInterface,
  GridPropertiesInterface
} from '../interface/workSpace_store_interface'
import type { SelectValue } from 'ant-design-vue/es/select'
import type { AlbumDataInterface } from '@/components/pages/work-space/utils/interface/interface'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'

export default function useWorkSpace() {
  const apiKey = import.meta.env.VITE_API_URL

  // states
  const albumName = ref<string | undefined>('')
  const artist = ref<string | undefined>('')
  const searchData = ref<AlbumDataInterface[]>([])
  const gridType = ref<string | SelectValue>('')
  const gridOption: GridOptionInterface = gridOptionStore

  // values

  const gridTypeOptions = [
    { label: 'basic', value: 'basic' },
    { label: 'Top10', value: 'top10' },
    { label: 'Top25', value: 'top25' },
    { label: 'Top50', value: 'top50' },
    { label: 'Top100', value: 'top100' },
    { label: 'Custom', value: 'custom' }
  ]

  const tooltipOptions = [
    { label: 'None', value: 'none' },
    { label: 'Side', value: 'side' },
    { label: 'Bottom', value: 'bottom' }
  ]

  // funtions

  const gridInit = () => {
    const largeTiles: GridPropertiesInterface[] = []
    const middleTiles: GridPropertiesInterface[] = []
    const smallTiles: GridPropertiesInterface[] = []

    const largeGridData: GridDataInterface = {
      col: 5,
      count: 10,
      grids: largeTiles
    }

    const middleGridData: GridDataInterface = {
      col: 6,
      count: 12,
      grids: middleTiles
    }

    const smallGridData: GridDataInterface = {
      col: 10,
      count: 20,
      grids: smallTiles
    }

    for (let index = 0; index < gridOptionStore.tileLimit; index++) {
      if (index < 10) {
        largeTiles.push({
          width: 20,
          height: 20,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }
      if (index > 9 && index < 22) {
        middleTiles.push({
          width: 16,
          height: 16,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }

      if (index > 21) {
        smallTiles.push({
          width: 10,
          height: 10,
          imagePath: '',
          title: '',
          key: index.toString(),
          artist: ''
        })
      }
    }

    gridDatasStore.gridDatas = [largeGridData, middleGridData, smallGridData]
  }

  const handleChange = (e: ChangeEvent, key: string) => {
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

    const largeTiles: GridPropertiesInterface[] = []
    const middleTiles: GridPropertiesInterface[] = []
    const smallTiles: GridPropertiesInterface[] = []

    const largeGridData: GridDataInterface = {
      col: 5,
      count: 10,
      grids: largeTiles
    }

    const middleGridData: GridDataInterface = {
      col: 6,
      count: 12,
      grids: middleTiles
    }

    const smallGridData: GridDataInterface = {
      col: 10,
      count: 20,
      grids: smallTiles
    }

    let tileLimit = 42
    if (e === 'basic') {
      tileLimit = 42

      for (let index = 0; index < tileLimit; index++) {
        if (index < 10) {
          largeTiles.push({
            width: 18,
            height: 18,
            imagePath: '',
            title: '',
            key: index.toString(),
            artist: ''
          })
        }
        if (index > 9 && index < 22) {
          middleTiles.push({
            width: 15,
            height: 15,
            imagePath: '',
            title: '',
            key: index.toString(),
            artist: ''
          })
        }

        if (index > 21) {
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
  }

  const handleTooltip = (e: SelectValue) => {
    if (e && typeof e === 'string') {
      gridOptionStore.tooltipOption = e
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

  const handleDragEnd = (e: any) => {
    const accessKey = e.target.accessKey

    gridDatasStore.gridDatas.forEach((gridData: GridDataInterface) => {
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
            gridDatasStore.gridDatas.forEach((gridData: GridDataInterface) => {
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

  const downloadImage = async (key: string) => {
    const captureArea: HTMLElement | null = document.querySelector('#captureArea')
    const type = key === 'png' ? 'image/png' : 'image/jpeg'

    if (captureArea) {
      const canvas = await html2canvas(captureArea, { allowTaint: true, useCORS: true })
      const image = canvas.toDataURL(type)
      const link = document.createElement('a')
      link.download = 'captured-image'
      link.href = image
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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
    downloadImage
  }
}
