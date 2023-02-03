<template>
  <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
    <pre>{{ detailData }}</pre>
  </el-dialog>
</template>
<script>
import axios from 'axios'
export default {
  name: 'detail-dialog',
  data() {
    return {
      dialogVisible: false,
      detailData: '',
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    async getDetail() {
      ;({ data: this.detailData } = await axios.get(
        'https://192.168.2.18/static/oss/hsja-platform-image/login/full-com/package.json'
      ))
    },
  },
}
</script>
<style lang="scss" scoped></style>
