<script setup lang="ts">
import { RouterView } from 'vue-router'
import { darkTheme } from '@/main'
import ProductLogo from './components/icons/ProductLogo.vue'
</script>

<template>
  <el-config-provider size="large">
    <el-container
      style="height: 100dvh; width: 100dvw"
      :style="darkTheme ? 'background-color: #000000' : 'background-color: #ffffff'"
      :key="darkTheme"
    >
      <el-header>
        <el-menu :default-active="$route.path" router mode="horizontal" ellipsis="false">
          <el-menu-item>
            <el-icon>
              <ProductLogo />
            </el-icon>
            <span style="font-weight: bold"> 学生随机抽选工具 </span>
          </el-menu-item>
          <el-menu-item index="/">
            <el-icon>
              <House />
            </el-icon>
            <span> 主界面 </span>
          </el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="/settings">
            <el-icon>
              <Setting />
            </el-icon>
            <span> 设置 </span>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon>
              <InfoFilled />
            </el-icon>
            <span> 关于 </span>
          </el-menu-item>
          <el-menu-item @click="darkTheme = !darkTheme">
            <el-switch v-model="darkTheme" active-icon="Moon" inactive-icon="Sunny" inline-prompt />
            <span> &nbsp; 暗黑模式 </span>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-config-provider>
</template>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
