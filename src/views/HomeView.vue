<script setup lang="ts">
import { ref } from 'vue'
import { config } from '@/main'
const nameList = ref(config.parseNameList())
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
  const originalNameList = config.parseNameList()
  const order = getRandomOrder(nameList.value.length)
  const resultNameList = []
  for (let i = 0; i < originalNameList.length; i++) {
    resultNameList.push(originalNameList[order[i]])
  }
  console.log(resultNameList)
  nameList.value.length = 0
  nameList.value = resultNameList
  console.log(nameList.value)
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
      <el-carousel
        height="60vh"
        arrow="never"
        :direction="config.data.layoutMode"
        type="card"
        :interval="100"
        :autoplay="running"
        indicator-position="none"
        motion-blur
      >
        <el-carousel-item v-for="item in nameList" :key="nameList.indexOf(item)">
          <el-card
            class="box-card"
            :body-style="
              config.data.layoutMode === 'vertical'
                ? 'font-size:5vw; text-align: center'
                : 'font-size:10vw; text-align: center'
            "
          >
            <span>{{ item }}</span></el-card
          >
        </el-carousel-item>
      </el-carousel>
      <br />
      <el-row justify="center">
        <el-button
          type="primary"
          @click="Start()"
          v-if="!running"
          style="font-size: 2vw; height: 10vh"
          ><el-icon><VideoPlay /></el-icon>开始</el-button
        >
        <el-button type="danger" @click="Stop()" v-else style="font-size: 2vw; height: 10vh"
          ><el-icon><VideoPause /></el-icon>停止</el-button
        >
      </el-row>
    </el-main>
  </el-container>
</template>
