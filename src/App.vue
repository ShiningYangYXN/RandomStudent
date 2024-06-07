<script setup lang="ts">
import { RouterView } from 'vue-router'
import { darkTheme } from '@/main'
</script>

<template>
  <el-container
    style="height: 100%; width: 100%"
    :style="darkTheme ? 'background-color: #000000' : 'background-color: #ffffff'"
    :key="darkTheme"
  >
    <el-header>
      <el-menu :default-active="$route.path" router mode="horizontal">
        <el-menu-item>
          <img src="@/assets/logo.svg" style="height: 2rem; width: 2rem" />
          <span>&emsp;学生随机抽选工具</span>
        </el-menu-item>
        <el-menu-item index="/">
          <el-icon> <House /> </el-icon>
          <span>主界面</span>
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="/settings">
          <el-icon> <Setting /> </el-icon>
          <span>设置</span>
        </el-menu-item>
        <el-menu-item index="/about">
          <el-icon> <InfoFilled /> </el-icon>
          <span>关于</span>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main> <RouterView /> </el-main>
  </el-container>
</template>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
