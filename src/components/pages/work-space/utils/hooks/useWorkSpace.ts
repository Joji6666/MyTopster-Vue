import type { AlbumDataInterface } from '@/components/pages/work-space/utils/interface/interface'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
import axios from 'axios'
import { ref } from 'vue'
import { gridDatasStore, gridOptionStore, selectedImageStore } from '../store/workSpace_store'
import type {
  GridOptionInterface,
  GridPropertiesInterface
} from '../interface/workSpace_store_interface'
import type { SelectValue } from 'ant-design-vue/es/select'

export default function useWorkSpace() {
  // states
  const albumName = ref<string | undefined>('')
  const artist = ref<string | undefined>('')
  const searchData = ref<AlbumDataInterface[]>([])
  const gridType = ref<string | SelectValue>('')
  const gridOption: GridOptionInterface = gridOptionStore

  // values

  // funtions

  const gridInit = () => {
    const tiles: GridPropertiesInterface[] = []
    for (let index = 0; index < gridOptionStore.tileLimit; index++) {
      if (index < 10) {
        tiles.push({
          width: 20,
          height: 20,
          imagePath: '',
          title: '',
          key: index.toString()
        })
      }
      if (index > 9 && index < 22) {
        tiles.push({
          width: 16,
          height: 16,
          imagePath: '',
          title: '',
          key: index.toString()
        })
      }

      if (index > 21) {
        tiles.push({
          width: 10,
          height: 10,
          imagePath: '',
          title: '',
          key: index.toString()
        })
      }
    }

    gridDatasStore.gridDatas = tiles
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
    console.log(e, 'e@', key, 'key@@')
    gridType.value = e
    const tiles: GridPropertiesInterface[] = []
    let tileLimit = 42
    if (e === 'type1') {
      tileLimit = 42

      for (let index = 0; index < tileLimit; index++) {
        if (index < 10) {
          tiles.push({
            width: 18,
            height: 18,
            imagePath: '',
            title: '',
            key: index.toString()
          })
        }
        if (index > 9 && index < 22) {
          tiles.push({
            width: 15,
            height: 15,
            imagePath: '',
            title: '',
            key: index.toString()
          })
        }

        if (index > 21) {
          tiles.push({
            width: 8,
            height: 8,
            imagePath: '',
            title: '',
            key: index.toString()
          })
        }
      }

      gridDatasStore.gridDatas = tiles
    }
  }

  const handleSearch = async () => {
    const res = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumName.value}&api_key=f6e2e55391f8359c9453f57680549175&format=json`
    )
    if (res) {
      console.log(res, 'res !@')
      searchData.value = res.data.results.albummatches.album
    }
  }

  const handleDragOn = (image: AlbumDataInterface) => {
    selectedImageStore.seletedImage = image
  }

  const handleDragEnd = (e: any) => {
    const accessKey = e

    console.log(accessKey, 'access Key')
    console.log(gridDatasStore.gridDatas)

    const foundTile = gridDatasStore.gridDatas.find(
      (grid: GridPropertiesInterface) => grid.key === accessKey
    )

    if (foundTile && selectedImageStore.seletedImage) {
      foundTile.imagePath = selectedImageStore.seletedImage.image[3]['#text']
      foundTile.title = selectedImageStore.seletedImage.name
    }
  }

  return {
    albumName,
    artist,
    searchData,
    gridOption,
    gridType,
    gridInit,
    handleChange,
    handleSearch,
    handleDragOn,
    handleDragEnd,
    handleSelect
  }
}
