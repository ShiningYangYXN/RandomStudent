<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

import { darkTheme } from '@/main'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const { layoutMode, enableBlur } = storeToRefs(settingsStore)
const strNameList = ref(settingsStore.nameListString)

const showInputStudentCountDialog = ref(false)
const studentCount = ref(0)

watchEffect(() => {
  settingsStore.setNameList(strNameList.value)
})

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
      <el-popconfirm
        title="确定要重置设置吗？"
        confirm-button-text="是"
        cancel-button-text="否"
        @confirm="
          () => {
            strNameList = ''
            settingsStore.$reset()
          }
        "
      >
        <template #reference>
          <el-button type="danger">
            <el-icon>
              <Warning />
            </el-icon>
            <span> 重置 </span>
          </el-button>
        </template>
      </el-popconfirm>
    </el-header>
    <el-main>
      <el-scrollbar height="65dvh">
        <el-card class="box-card">
          <template #header>
            <el-icon>
              <Document />
            </el-icon>
            <span> 学生名单 </span>
          </template>
          <el-input
            v-model="strNameList"
            placeholder="请输入学生姓名，回车或使用英文逗号分隔，空值将不会被添加"
            :autosize="{ minRows: 1, maxRows: 10 }"
            type="textarea"
          />
          <template #footer>
            <el-button type="primary" @click="showInputStudentCountDialog = true">
              <el-icon>
                <DocumentAdd />
              </el-icon>
              <span> 创建纯学号名单 </span>
            </el-button>

            <el-popconfirm
              title="确定要清空吗？"
              confirm-button-text="是"
              cancel-button-text="否"
              @confirm="strNameList = ''"
            >
              <template #reference>
                <el-button type="danger">
                  <span> 清空 </span>
                  <el-icon>
                    <Delete />
                  </el-icon>
                </el-button>
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
            <el-button type="primary" @click="GenerateNumberOnlyNameList(studentCount)">
              <el-icon>
                <Check />
              </el-icon>
              <span> 创建 </span>
            </el-button>
          </template>
        </el-dialog>
        <br />
        <el-card class="box-card">
          <template #header>
            <el-icon>
              <Operation />
            </el-icon>
            <span> 界面选项 </span>
          </template>
          <el-form label-position="top">
            <el-form-item label="暗黑模式">
              <el-switch
                v-model="darkTheme"
                active-icon="Moon"
                inactive-icon="Sunny"
                inline-prompt
              />
            </el-form-item>
            <el-form-item label="启用模糊动效">
              <el-switch v-model="enableBlur" />
            </el-form-item>
            <el-form-item label="主界面布局">
              <el-select v-model="layoutMode">
                <el-option value="horizontal" label="水平"> 水平 </el-option>
                <el-option value="vertical" label="垂直"> 垂直 </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<style scoped></style>
