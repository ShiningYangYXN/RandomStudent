<script setup>
import { version } from '@/../package.json'
</script>
<template>
  <el-row justify="center">
    <img src="@/assets/logo.svg" alt="logo" style="width: 30vh; height: 30vh" />
  </el-row>
  <el-row justify="center">
    <el-text type="primary" style="font-size: 10vh; font-weight: bold">RandomStudent</el-text>
    <el-text type="info" style="font-size: 5vh">{{ version }}</el-text>
  </el-row>
  <el-row justify="center">
    <el-text type="info" style="font-size: 5vh"
      >一款基于 Vue3 和 Element Plus 的学生随机抽选工具</el-text
    >
  </el-row>
  <br />
  <el-row justify="center">
    <el-button
      type="primary"
      @click="window.open('https://github.com/ShiningYangYXN/RandomStudent')"
      style="height: 10vh; font-size: 5vh"
      >GitHub</el-button
    >
  </el-row>
</template>
