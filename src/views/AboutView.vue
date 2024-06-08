<script setup lang="ts">
import { version } from '@/../package.json'
import ProductLogo from '../components/icons/ProductLogo.vue'
import GitHub from '../components/icons/GitHub.vue'
</script>
<template>
  <el-row justify="center">
    <ProductLogo style="width: 15vw; height: 15vw" />
  </el-row>
  <el-row justify="center">
    <el-text type="primary" style="font-size: 5vw; font-weight: bold; text-align: center">
      RandomStudent
    </el-text>
    <el-text type="info" style="font-size: 2vw; text-align: center">
      {{ version }}
    </el-text>
  </el-row>
  <el-row justify="center">
    <el-text type="info" style="font-size: 2vw; text-align: center">
      一款基于 Vue 3 和 Element Plus 的学生随机抽选工具，根据 MIT License 开源
    </el-text>
  </el-row>
  <br />
  <el-row justify="center">
    <a
      href="https://github.com/ShiningYangYXN/RandomStudent"
      target="_blank"
      style="color: white; font-size: 2vw"
    >
      <el-button type="primary" style="height: 5vw; font-size: 2vw">
        <el-icon>
          <GitHub />
        </el-icon>
        &nbsp; GitHub
      </el-button>
    </a>
  </el-row>
</template>
