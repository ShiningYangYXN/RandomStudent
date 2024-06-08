<script setup lang="ts">
import { ref, toValue } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const { nameList, layoutMode, enableBlur } = storeToRefs(settingsStore)

const choicePool = ref(toValue(nameList))
const running = ref(false)

function getRandomBelow(max: number) {
  return crypto.getRandomValues(new Uint32Array(1))[0] % max
}

function getRandomOrder(max: number) {
  let arr: number[] = []
  let num = 0
  while (arr.length < max) {
    num = getRandomBelow(max)
    if (!arr.includes(num)) {
      arr.push(num)
    }
  }
  console.log(arr)
  return arr
}

function RandomizeNameList() {
  const order = getRandomOrder(nameList.value.length)
  choicePool.value = []
  for (let i = 0; i < nameList.value.length; i++) {
    choicePool.value.push(nameList.value[order[i]])
  }
  console.log(choicePool.value)
}

function Start() {
  RandomizeNameList()
  running.value = true
}

function Stop() {
  running.value = false
}
</script>

<template>
  <el-container>
    <el-main>
      <el-result
        v-if="nameList.length === 0"
        icon="warning"
        title="配置名单"
        sub-title="请先前往设置配置名单,然后再开始抽选"
      >
        <template #extra>
          <RouterLink to="/settings">
            <el-button type="primary"> 好的 </el-button>
          </RouterLink>
        </template>
      </el-result>
      <template v-else>
        <el-carousel
          height="60vh"
          arrow="never"
          :direction="layoutMode"
          type="card"
          :interval="100"
          :autoplay="running"
          indicator-position="none"
          :pause-on-hover="false"
          :motion-blur="enableBlur"
        >
          <el-carousel-item v-for="item in choicePool" :key="choicePool.indexOf(item)">
            <el-card
              class="box-card"
              :body-style="
                layoutMode === 'vertical'
                  ? 'font-size:5rem; text-align: center'
                  : 'font-size:10rem; text-align: center'
              "
            >
              <span>
                {{ item }}
              </span>
            </el-card>
          </el-carousel-item>
        </el-carousel>
        <br />
        <el-row justify="center">
          <Transition>
            <el-button
              v-if="!running"
              type="primary"
              @click="Start()"
              style="font-size: 3rem; height: 5rem"
            >
              <el-icon>
                <VideoPlay />
              </el-icon>
              开始
            </el-button>
            <el-button v-else type="danger" @click="Stop()" style="font-size: 3rem; height: 5rem">
              <el-icon>
                <VideoPause />
              </el-icon>
              停止
            </el-button>
          </Transition>
        </el-row>
      </template>
    </el-main>
  </el-container>
</template>
