import type { AlbumDataInterface } from '@/components/pages/work-space/utils/interface/interface'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
import axios from 'axios'
import { ref } from 'vue'
import { gridDatasStore, gridOptionStore, selectedImageStore } from '../store/workSpace_store'
import type {
  GridOptionInterface,
  GridPropertiesInterface
} from '../interface/workSpace_store_interface'

export default function useWorkSpace() {
  // states
  const albumName = ref<string | undefined>('')
  const artist = ref<string | undefined>('')
  const searchData = ref<AlbumDataInterface[]>([])
  const gridOption: GridOptionInterface = gridOptionStore

  // values

  //funtions

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
    const accessKey = e.target.accessKey

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
    handleChange,
    handleSearch,
    handleDragOn,
    handleDragEnd
  }
}
