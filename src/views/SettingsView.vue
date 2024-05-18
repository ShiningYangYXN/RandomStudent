<script lang="ts" setup>
import { config } from '@/main'

import { ref, onBeforeUnmount, watch } from 'vue'
//import { ElNotification } from 'element-plus'
const strNameList = ref(config.data.nameList.replace(/,/g, '\n'))
const arrayNameList = ref(config.parseNameList())

const showInputStudentCountDialog = ref(false)
const studentCount = ref(0)
const darkMode = ref(config.data.darkMode)
const layoutMode = ref(config.data.layoutMode)
watch(strNameList, () => {
  arrayNameList.value = config.parseNameList()
})
function SaveSettings() {
  config.setNameList(strNameList.value)
  config.data.darkMode = darkMode.value
  config.data.layoutMode = layoutMode.value
}
onBeforeUnmount(SaveSettings)
function GenerateNumberOnlyNameList(count: number) {
  let list = ''
  for (let i = 1; i <= count; i++) {
    list += i + '号\n'
  }
  strNameList.value = list
  showInputStudentCountDialog.value = false
}
</script>
<template>
  <el-container>
    <el-header>
      <el-button type="primary" @click="SaveSettings()"
        ><el-icon><DocumentChecked /></el-icon>保存</el-button
      >
      <el-popconfirm
        title="确定要重置设置吗？"
        confirm-button-text="是"
        cancel-button-text="否"
        @confirm="config.reset()"
      >
        <template #reference>
          <el-button type="danger"
            ><el-icon><Warning /></el-icon>重置</el-button
          ></template
        >
      </el-popconfirm>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <el-icon><Document /></el-icon>
          <span>学生名单</span>
        </template>
        <el-input
          v-model="strNameList"
          placeholder="请输入学生姓名，回车或使用英文逗号分隔，空值将不会被添加"
          :autosize="{ minRows: 1, maxRows: 10 }"
          type="textarea"
        />
        <template #footer>
          <el-button type="primary" @click="showInputStudentCountDialog = true">
            <el-icon><DocumentAdd /></el-icon>创建纯学号名单</el-button
          >

          <el-popconfirm
            title="确定要清空吗？"
            confirm-button-text="是"
            cancel-button-text="否"
            @confirm="strNameList = ''"
          >
            <template #reference>
              <el-button type="danger"
                >清空<el-icon><Delete /></el-icon
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-card>
      <el-dialog title="创建纯学号名单" v-model="showInputStudentCountDialog">
        <el-row justify="start"> 输入学生数量 </el-row>
        <el-row justify="end">
          <el-input-number v-model="studentCount" :min="1" style="justify-self: right" />
        </el-row>
        <template #footer>
          <el-button type="primary" @click="GenerateNumberOnlyNameList(studentCount)"
            ><el-icon><Check /></el-icon>创建</el-button
          >
        </template>
      </el-dialog>
      <br />
      <el-card class="box-card">
        <template #header>
          <el-icon><Operation /></el-icon>
          <span>界面选项</span>
        </template>
        <el-form label-position="top">
          <el-form-item label="暗黑模式">
            <el-switch v-model="darkMode"></el-switch>
          </el-form-item>
          <el-form-item label="主界面布局">
            <el-select v-model="layoutMode"
              ><el-option value="horizontal" label="水平">水平</el-option
              ><el-option value="vertical" label="垂直">垂直</el-option></el-select
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>
