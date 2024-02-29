import type { AlbumDataInterface } from '@/utils/interface'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
import axios from 'axios'
import { ref } from 'vue'

export default function useWorkSpace() {
  const albumName = ref<string | undefined>('')
  const artist = ref<string | undefined>('')
  const searchData = ref<AlbumDataInterface[]>([])

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

  return { albumName, artist, searchData, handleChange, handleSearch }
}
