import { computed, watch } from 'vue'
import {
  autoColumnsGridDatasStore,
  customGridDatas,
  gridDatasStore,
  gridOptionStore,
  storageData
} from '../store/workSpace_store'
import type {
  GridDataInterface,
  GridOptionInterface,
  StorageDataInterface
} from '../interface/workSpace_store_interface'
import useWorkSpace from './useWorkSpace'
import type { SelectValue } from 'ant-design-vue/es/select'

interface SelectOptionInterface {
  label: string
  value: string
}

const useStorage = () => {
  const { createGrids } = useWorkSpace()

  const storageOptions = computed(() => {
    return storageData.storageData.reduce(
      (cur: SelectOptionInterface[], data: StorageDataInterface) => {
        cur.push({ label: data.name, value: data.name })

        return cur
      },
      []
    )
  })

  const saveStorage = (target: string = '', isClose: boolean = false, option: any = {}) => {
    const targetValue = target !== '' ? target : gridOptionStore.selectedWork

    const targetWork = storageData.storageData.find(
      (storageData: StorageDataInterface) => storageData.name === targetValue
    )

    if (targetWork) {
      targetWork.gridDatas = gridDatasStore.gridDatas

      if (targetWork?.options && targetWork?.options?.isAutoColumnsGrid) {
        targetWork.gridDatas = autoColumnsGridDatasStore.gridDatas
      }

      if (targetWork?.options && targetWork?.options?.isCustom) {
        targetWork.gridDatas = customGridDatas.customGridDatas
      }

      targetWork.options = Object.keys(option).length > 0 ? option : gridOptionStore
    }

    localStorage.setItem('datas', JSON.stringify(storageData.storageData))

    if (isClose) {
      localStorage.setItem('selectedWork', JSON.stringify(targetValue))
    }
  }

  const deleteStorage = () => {
    const filteredStorage = storageData.storageData.filter(
      (storageData: StorageDataInterface) => storageData.name !== gridOptionStore.selectedWork
    )

    localStorage.setItem('datas', JSON.stringify(filteredStorage))

    storageData.storageData = filteredStorage

    const firstWork = storageData.storageData[storageData.storageData.length - 1]

    if (firstWork?.options) {
      Object.entries(firstWork.options).forEach(([key, value]) => {
        gridOptionStore[key] = value
      })
    }
    gridOptionStore.selectedWork = firstWork.name
    if (firstWork.options.isAutoColumnsGrid) {
      autoColumnsGridDatasStore.gridDatas = firstWork.gridDatas
    }

    if (firstWork.options.isCustom) {
      customGridDatas.customGridDatas = firstWork.gridDatas
    }

    if (!firstWork.options.isCustom && !firstWork.options.isAutoColumnsGrid) {
      gridDatasStore.gridDatas = firstWork.gridDatas
    }
  }

  const getLocalStorage = async () => {
    const getStorageDatas = localStorage.getItem('datas')

    const selectedWork = localStorage.getItem('selectedWork')

    if (getStorageDatas) {
      const parsedData = JSON.parse(getStorageDatas)

      storageData.storageData = parsedData

      if (selectedWork) {
        gridOptionStore.selectedWork = JSON.parse(selectedWork)

        const targetWork: StorageDataInterface = parsedData.find(
          (storageData: StorageDataInterface) => storageData.name === JSON.parse(selectedWork)
        )

        if (targetWork) {
          gridDatasStore.gridDatas = targetWork?.gridDatas

          if (targetWork?.options) {
            Object.entries(targetWork.options).forEach(([key, value]) => {
              gridOptionStore[key] = value
            })
          }

          if (targetWork?.options && targetWork?.options?.isAutoColumnsGrid) {
            autoColumnsGridDatasStore.gridDatas = targetWork.gridDatas
            gridOptionStore.isAutoColumnsGrid = true
          }

          if (targetWork?.options && targetWork?.options?.isCustom) {
            customGridDatas.customGridDatas = targetWork.gridDatas
            gridOptionStore.isCustom = true
          }
        }
      }
    }
  }

  const createLocalStorage = async () => {
    const gridDatas: GridDataInterface[] = createGrids(10, 12, 20, 5, 6, 10)
    const storageDatas = [
      {
        name: 'work1',
        gridDatas,
        options: {
          backgroundColor: '#000000',
          tileLimit: 42,
          gridType: 'basic',
          tooltipOption: 'none',
          tooltipBackgroundColor: '#000000',
          textColor: '#ffffff',
          gridGap: 1,
          isCustom: false,
          selectedWork: 'work1',
          backgroundImagePath: '',
          isAutoColumnsGrid: false
        }
      }
    ]

    localStorage.setItem('datas', JSON.stringify(storageDatas))
    localStorage.setItem('selectedWork', 'work1')
  }

  const handleWork = (e: SelectValue, key: string) => {
    const prevTarget = localStorage.getItem('selectedWork')
    const prevOption: any = {}
    Object.entries(gridOptionStore).forEach(([key, value]) => {
      prevOption[key] = value
    })

    if (prevTarget) {
      saveStorage(JSON.parse(prevTarget), false, prevOption)
    }

    if (e && typeof e === 'string') {
      gridOptionStore.selectedWork = e
      localStorage.setItem('selectedWork', JSON.stringify(e))

      const targetWork = storageData.storageData.find(
        (storageData: StorageDataInterface) => storageData.name === gridOptionStore.selectedWork
      )

      if (targetWork) {
        gridDatasStore.gridDatas = targetWork?.gridDatas

        if (targetWork?.options && targetWork?.options?.isAutoColumnsGrid) {
          autoColumnsGridDatasStore.gridDatas = targetWork.gridDatas
          gridOptionStore.isAutoColumnsGrid = true
        } else {
          gridOptionStore.isAutoColumnsGrid = false
        }

        if (targetWork?.options && targetWork?.options?.isCustom) {
          customGridDatas.customGridDatas = targetWork.gridDatas
          gridOptionStore.isCustom = true
        } else {
          gridOptionStore.isCustom = false
        }
      }
    }
  }

  const addWork = () => {
    const getStorageDatas = localStorage.getItem('datas')
    const prevOption: any = {}
    Object.entries(gridOptionStore).forEach(([key, value]) => {
      prevOption[key] = value
    })
    const prevTarget = localStorage.getItem('selectedWork')

    console.log(prevOption, 'prevOption @@')
    if (prevTarget) {
      saveStorage(JSON.parse(prevTarget), false, prevOption)
    }

    const starndardOption: GridOptionInterface = {
      backgroundColor: '#000000',
      tileLimit: 42,
      gridType: 'basic',
      tooltipOption: 'none',
      tooltipBackgroundColor: '#000000',
      textColor: '#ffffff',
      gridGap: 1,
      isCustom: false,
      selectedWork: '',
      backgroundImagePath: '',
      isAutoColumnsGrid: false
    }

    if (getStorageDatas) {
      const parsedData = JSON.parse(getStorageDatas)

      const gridDatas: GridDataInterface[] = createGrids(10, 12, 20, 5, 6, 10, true)

      let name = `work${parsedData.length + 1}`

      if (
        parsedData.find(
          (data: StorageDataInterface) => data.name === `work${parsedData.length + 1}`
        )
      ) {
        name = `work${parsedData.length + 2}`
      }

      const storageDatas: StorageDataInterface = {
        name,
        gridDatas,
        options: starndardOption
      }
      storageDatas.options.selectedWork = name

      parsedData.push(storageDatas)

      Object.entries(starndardOption).forEach(([key, value]) => {
        gridOptionStore[key] = value
      })

      gridOptionStore.selectedWork = name
      storageData.storageData = parsedData
      localStorage.setItem('datas', JSON.stringify(parsedData))
      localStorage.setItem('selectedWork', JSON.stringify(name))

      gridDatasStore.gridDatas = gridDatas
    }
  }

  watch(gridOptionStore, (oldValue, newValue) => {
    saveStorage()
  })

  return {
    storageOptions,
    deleteStorage,
    saveStorage,
    getLocalStorage,
    createLocalStorage,
    handleWork,
    addWork
  }
}

export default useStorage
