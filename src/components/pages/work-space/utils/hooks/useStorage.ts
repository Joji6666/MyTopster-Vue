import { computed } from 'vue'
import {
  autoColumnsGridDatasStore,
  customGridDatas,
  customGridOptions,
  gridDatasStore,
  gridOptionStore,
  storageData
} from '../store/workSpace_store'
import type {
  CustomGridOptionsInterface,
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

const standardCustomGridOption: CustomGridOptionsInterface = {
  largeTileCount: 0,
  middleTileCount: 0,
  smallTileCount: 0,
  row: 1,
  col: 1,
  type: 'onlySmall'
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
    if (storageData.storageData.length > 0) {
      const targetValue = target !== '' ? target : gridOptionStore.selectedWork

      const targetWork = storageData.storageData.find(
        (storageData: StorageDataInterface) => storageData.name === targetValue
      )

      if (targetWork) {
        targetWork.gridDatas = gridDatasStore.gridDatas
        targetWork.options = Object.keys(option).length > 0 ? option : gridOptionStore

        if (targetWork.options.isCustom) {
          targetWork.customOptions = customGridOptions
        } else {
          targetWork.customOptions = standardCustomGridOption
        }

        if (targetWork?.options && targetWork?.options?.isAutoColumnsGrid) {
          targetWork.gridDatas = autoColumnsGridDatasStore.gridDatas
        }

        if (targetWork?.options && targetWork?.options?.isCustom) {
          targetWork.gridDatas = customGridDatas.customGridDatas
        }
      }

      localStorage.setItem('datas', JSON.stringify(storageData.storageData))

      if (isClose) {
        localStorage.setItem('selectedWork', targetValue)
      }
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
      gridDatasStore.gridDatas = []
      customGridDatas.customGridDatas = []
    }

    if (firstWork.options.isCustom) {
      customGridDatas.customGridDatas = firstWork.gridDatas
      gridDatasStore.gridDatas = []
      autoColumnsGridDatasStore.gridDatas = []
    }

    if (!firstWork.options.isCustom && !firstWork.options.isAutoColumnsGrid) {
      gridDatasStore.gridDatas = firstWork.gridDatas
      customGridDatas.customGridDatas = []
      autoColumnsGridDatasStore.gridDatas = []
    }
  }

  const getLocalStorage = async () => {
    const getStorageDatas = localStorage.getItem('datas')

    const selectedWork = localStorage.getItem('selectedWork')

    if (getStorageDatas) {
      const parsedData = JSON.parse(getStorageDatas)

      storageData.storageData = parsedData

      if (selectedWork) {
        gridOptionStore.selectedWork = selectedWork

        const targetWork: StorageDataInterface = parsedData.find(
          (storageData: StorageDataInterface) => storageData.name === selectedWork
        )

        if (targetWork) {
          gridDatasStore.gridDatas = targetWork?.gridDatas

          if (targetWork?.options) {
            Object.entries(targetWork.options).forEach(([key, value]) => {
              gridOptionStore[key] = value
            })
          }

          Object.entries(targetWork.customOptions).forEach(([key, value]) => {
            customGridOptions[key] = value
          })

          if (targetWork?.options && targetWork?.options?.isAutoColumnsGrid) {
            autoColumnsGridDatasStore.gridDatas = targetWork.gridDatas
            gridOptionStore.isAutoColumnsGrid = true
            gridDatasStore.gridDatas = []
            customGridDatas.customGridDatas = []
          }

          if (targetWork?.options && targetWork?.options?.isCustom) {
            customGridDatas.customGridDatas = targetWork.gridDatas
            gridOptionStore.isCustom = true
            gridDatasStore.gridDatas = []
            autoColumnsGridDatasStore.gridDatas = []
          }
        }
      }
    }
  }

  const createLocalStorage = async () => {
    const gridDatas: GridDataInterface[] = createGrids(10, 12, 20, 5, 6, 10)
    const storageDatas: StorageDataInterface[] = [
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
          isAutoColumnsGrid: false,
          backgroundImageFile: null
        },
        customOptions: standardCustomGridOption
      }
    ]

    localStorage.setItem('datas', JSON.stringify(storageDatas))
    localStorage.setItem('selectedWork', 'work1')
    storageData.storageData = storageDatas
  }

  const handleWork = async (e: SelectValue, key: string) => {
    const prevTarget = localStorage.getItem('selectedWork')

    const prevOption: any = {}
    Object.entries(gridOptionStore).forEach(([key, value]) => {
      prevOption[key] = value
    })

    if (prevTarget) {
      await saveStorage(prevTarget, false, prevOption)
    }

    if (e && typeof e === 'string') {
      // gridOptionStore.selectedWork = e
      localStorage.setItem('selectedWork', e)

      const targetWork = storageData.storageData.find(
        (storageData: StorageDataInterface) => storageData.name === e
      )

      if (targetWork) {
        gridDatasStore.gridDatas = targetWork?.gridDatas

        if (targetWork?.options && targetWork?.options?.isAutoColumnsGrid) {
          autoColumnsGridDatasStore.gridDatas = targetWork.gridDatas
          gridOptionStore.isAutoColumnsGrid = true
          gridDatasStore.gridDatas = []
          customGridDatas.customGridDatas = []
        } else {
          gridOptionStore.isAutoColumnsGrid = false
        }

        if (targetWork?.options && targetWork?.options?.isCustom) {
          customGridDatas.customGridDatas = targetWork.gridDatas
          gridOptionStore.isCustom = true
          gridDatasStore.gridDatas = []
          autoColumnsGridDatasStore.gridDatas = []
        } else {
          gridOptionStore.isCustom = false
        }
        const optionKeys = Object.keys(targetWork.options)
        for (const key of optionKeys) {
          gridOptionStore[key] = targetWork.options[key]
        }

        gridOptionStore.selectedWork = e

        const customOptionKeys = Object.keys(targetWork.customOptions)
        for (const key of customOptionKeys) {
          customGridOptions[key] = targetWork.customOptions[key]
        }
      }
    }
  }

  const addWork = async () => {
    const prevOption: any = {}
    Object.entries(gridOptionStore).forEach(([key, value]) => {
      prevOption[key] = value
    })
    const prevTarget = localStorage.getItem('selectedWork')

    if (prevTarget) {
      await saveStorage(prevTarget, false, prevOption)
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
      isAutoColumnsGrid: false,
      backgroundImageFile: null
    }

    const getStorageDatas = await localStorage.getItem('datas')

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
        options: starndardOption,
        customOptions: standardCustomGridOption
      }
      storageDatas.options.selectedWork = name

      parsedData.push(storageDatas)

      Object.entries(starndardOption).forEach(([key, value]) => {
        gridOptionStore[key] = value
      })

      Object.entries(standardCustomGridOption).forEach(([key, value]) => {
        customGridOptions[key] = value
      })

      gridOptionStore.selectedWork = name
      storageData.storageData = parsedData
      await localStorage.setItem('datas', JSON.stringify(parsedData))
      await localStorage.setItem('selectedWork', name)

      gridDatasStore.gridDatas = gridDatas
      autoColumnsGridDatasStore.gridDatas = []
      customGridDatas.customGridDatas = []
    }
  }

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
