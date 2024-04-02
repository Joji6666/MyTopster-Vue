import { ref, watch, nextTick } from 'vue'
import type { AlbumDataInterface } from '../interface/interface'
import { mobileSelectedImage, selectedImageStore } from '../store/workSpace_store'
import useWorkSpace from './useWorkSpace'
import type { GridPropertiesInterface } from '../interface/workSpace_store_interface'

const useMobile = () => {
  const { handleDragEnd } = useWorkSpace()

  const isEnd = ref<boolean>(false)
  const isGridDragEnd = ref<boolean>(false)

  const handleTouchStart = (image: AlbumDataInterface, e: TouchEvent) => {
    if (e?.touches) {
      const touchLocation = e.touches[0]

      mobileSelectedImage.data = image
      selectedImageStore.seletedImage = image

      mobileSelectedImage.x = touchLocation.pageX
      mobileSelectedImage.y = touchLocation.pageY
    }
  }

  const handleTouchGridStart = (gridValue: GridPropertiesInterface, e: TouchEvent) => {
    if (e?.touches) {
      const touchLocation = e.touches[0]

      mobileSelectedImage.gridData = gridValue
      selectedImageStore.seletedGrid = gridValue
      selectedImageStore.isGridDrag = true
      mobileSelectedImage.x = touchLocation.pageX - 30
      mobileSelectedImage.y = touchLocation.pageY - 150
    }
  }

  const handleTouchGridMove = (e: TouchEvent) => {
    if (e?.touches) {
      const touchLocation = e.touches[0]
      if (mobileSelectedImage.gridData) {
        mobileSelectedImage.x = touchLocation.pageX - 30
        mobileSelectedImage.y = touchLocation.pageY - 150
      }
    }
  }

  const handleTouchGridEnd = (e: TouchEvent) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const lastTouch = e.changedTouches[0]

      mobileSelectedImage.lastTouchX = lastTouch.clientX
      mobileSelectedImage.lastTouchY = lastTouch.clientY
    }
    mobileSelectedImage.gridData = null
    mobileSelectedImage.data = null
    mobileSelectedImage.x = 0
    mobileSelectedImage.y = 0

    mobileSelectedImage.isEnd = true
    isGridDragEnd.value = true
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

  watch(isGridDragEnd, async (newValue, oldValue) => {
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
      isGridDragEnd.value = false
    }
  })

  return {
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchGridStart,
    handleTouchGridEnd,
    handleTouchGridMove
  }
}

export default useMobile
