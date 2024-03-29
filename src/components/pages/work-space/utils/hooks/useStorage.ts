import { computed } from 'vue'
import { gridDatasStore, gridOptionStore, storageData } from '../store/workSpace_store'
import type {
  GridDataInterface,
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

  const saveStorage = () => {
    const targetWork = storageData.storageData.find(
      (storageData: StorageDataInterface) => storageData.name === gridOptionStore.selectedWork
    )

    if (targetWork) {
      targetWork.gridDatas = gridDatasStore.gridDatas
    }

    localStorage.setItem('datas', JSON.stringify(storageData.storageData))
    localStorage.setItem('selectedWork', JSON.stringify(gridOptionStore.selectedWork))
  }

  const deleteStorage = () => {
    const filteredStorage = storageData.storageData.filter(
      (storageData: StorageDataInterface) => storageData.name !== gridOptionStore.selectedWork
    )

    localStorage.setItem('datas', JSON.stringify(filteredStorage))

    storageData.storageData = filteredStorage
    gridOptionStore.selectedWork = `work${filteredStorage.length}`
    const firstWork = storageData.storageData[filteredStorage.length]

    gridDatasStore.gridDatas = firstWork.gridDatas
  }

  const getLocalStorage = async () => {
    const getStorageDatas = localStorage.getItem('datas')

    const selectedWork = localStorage.getItem('selectedWork')

    if (selectedWork) {
      gridOptionStore.selectedWork = JSON.parse(selectedWork)
    }

    if (getStorageDatas) {
      const parsedData = JSON.parse(getStorageDatas)

      storageData.storageData = parsedData
    }
  }

  const createLocalStorage = async () => {
    const gridDatas: GridDataInterface[] = createGrids(10, 12, 20, 5, 6, 10)
    const storageDatas = [
      {
        name: 'work1',
        gridDatas
      }
    ]

    localStorage.setItem('datas', JSON.stringify(storageDatas))
  }

  const handleWork = (e: SelectValue, key: string) => {
    if (e && typeof e === 'string') {
      gridOptionStore.selectedWork = e

      const targetWork = storageData.storageData.find(
        (storageData: StorageDataInterface) => storageData.name === gridOptionStore.selectedWork
      )

      if (targetWork) {
        gridDatasStore.gridDatas = targetWork?.gridDatas
      }

      saveStorage()
    }
  }

  const addWork = () => {
    const getStorageDatas = localStorage.getItem('datas')

    if (getStorageDatas) {
      const parsedData = JSON.parse(getStorageDatas)

      const gridDatas: GridDataInterface[] = createGrids(10, 12, 20, 5, 6, 10, true)
      const storageDatas = {
        name: `work${parsedData.length + 1}`,
        gridDatas
      }

      parsedData.push(storageDatas)

      localStorage.setItem('datas', JSON.stringify(parsedData))

      getLocalStorage()

      saveStorage()
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
