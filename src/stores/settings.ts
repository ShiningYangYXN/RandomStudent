import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

interface settings {
  nameList: string[]
  layoutMode: 'horizontal' | 'vertical'
  enableBlur: boolean
}
const defaultSettings: settings = {
  nameList: [],
  layoutMode: 'horizontal',
  enableBlur: false
}

export const useSettingsStore = defineStore('RandomStudentSettings', {
  state: () => {
    return useLocalStorage('RandomStudentSettings', defaultSettings, { mergeDefaults: true })
  },
  getters: {
    nameListString: (state) => state.nameList.join('\n')
  },
  actions: {
    setNameList(nameList: string) {
      nameList = nameList.replace(/,/g, '\n').trim()
      const result: string[] = []
      for (const person of nameList.split('\n')) {
        if (person != '' && !result.includes(person)) {
          result.push(person)
        }
      }
      this.nameList = result
    },
    $reset() {
      this.$patch(defaultSettings)
    }
  }
})
