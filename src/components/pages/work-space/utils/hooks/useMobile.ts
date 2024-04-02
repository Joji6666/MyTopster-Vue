import { ref, watch, nextTick } from 'vue'
import type { AlbumDataInterface } from '../interface/interface'
import { mobileSelectedImage, selectedImageStore } from '../store/workSpace_store'
import useWorkSpace from './useWorkSpace'

const useMobile = () => {
  const { handleDragEnd } = useWorkSpace()

  const isEnd = ref<boolean>(false)

  const handleTouchStart = (image: AlbumDataInterface, e: TouchEvent) => {
    if (e?.touches) {
      const touchLocation = e.touches[0]

      mobileSelectedImage.data = image
      selectedImageStore.seletedImage = image

      mobileSelectedImage.x = touchLocation.pageX
      mobileSelectedImage.y = touchLocation.pageY
    }
  }

  const handleTouchMove = (image: AlbumDataInterface, e: TouchEvent) => {
    if (e?.touches) {
      const touchLocation = e.touches[0]
      if (mobileSelectedImage.data) {
        mobileSelectedImage.x = touchLocation.pageX
        mobileSelectedImage.y = touchLocation.pageY
      }
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const lastTouch = e.changedTouches[0]

      mobileSelectedImage.lastTouchX = lastTouch.clientX
      mobileSelectedImage.lastTouchY = lastTouch.clientY
    }

    mobileSelectedImage.data = null
    mobileSelectedImage.x = 0
    mobileSelectedImage.y = 0
    isEnd.value = true
    mobileSelectedImage.isEnd = true
  }

  watch(isEnd, async (newValue, oldValue) => {
    if (newValue) {
      await nextTick()

      const dropTarget: any = document.elementFromPoint(
        mobileSelectedImage.lastTouchX,
        mobileSelectedImage.lastTouchY
      )

      if (dropTarget) {
        handleDragEnd(dropTarget?.accessKey)
      }

      mobileSelectedImage.isEnd = false
      isEnd.value = false
    }
  })

  return { handleTouchMove, handleTouchStart, handleTouchEnd }
}

export default useMobile
