import './assets/main.css'

import { createApp, reactive, watch } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useDark } from '@vueuse/core'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
const isDark = useDark()
export const config = reactive({
  data: {
    nameList: '请前往设置页面配置名单',
    darkMode: isDark,
    layoutMode: 'vertical'
  },
  parseNameList: () => {
    return config.data.nameList.split(',')
  },
  setNameList: (nameList: string) => {
    nameList = nameList.replace(/\n/g, ',').trim()
    let result = ''
    for (const person of nameList.split(',')) {
      if (person != '' && result.indexOf(person) == -1) {
        result += person + ','
      }
    }
    config.data.nameList = result.slice(0, result.length - 1)
  },
  update: () => {
    isDark.value = config.data.darkMode
    localStorage.setItem('configData', JSON.stringify(config.data))
  },
  reset: () => {
    localStorage.removeItem('configData')
    document.location.reload()
  }
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
if (localStorage.getItem('configData') === null) {
  localStorage.setItem('configData', JSON.stringify(config.data))
} else {
  try {
    config.data = JSON.parse(<string>localStorage.getItem('configData'))
  } catch {
    localStorage.setItem('configData', JSON.stringify(config.data))
  }
}
config.data = JSON.parse(<string>localStorage.getItem('configData'))
watch(config.data, () => {
  try {
    config.update()
    ElNotification({
      title: '保存成功',
      message: '设置已成功保存',
      type: 'success'
    })
  } catch (e) {
    ElNotification({
      title: '保存失败',
      message: '设置保存失败\n' + e,
      type: 'error'
    })
  }
})

app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
