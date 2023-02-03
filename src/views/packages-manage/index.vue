<template>
  <hs-layout no-search no-pagination has-sidebar>
    <div slot="page-breadcrumb">
      <hs-breadcrumb :list="breadcrumbList" />
    </div>
    <leftListVue slot="sidebar" />
    <section slot="btnBox" flex-between>
      <el-button type="primary">上传</el-button>
      <el-input style="width: 250px" placeholder="请输入名称"></el-input>
    </section>
    <el-scrollbar>
      <el-row :gutter="20">
        <el-col
          :xs="12"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
          v-for="item in pageList"
          :key="item.id"
        >
          <div class="single-box">
            <div class="img-box">
              <el-image
                :src="item.img"
                :preview-src-list="[item.img]"
              ></el-image>
            </div>
            <div class="box-bottom">
              <div>{{ item.cnName }}</div>
              <section>
                <el-button type="text" @click="detailClick(item)"
                  >详情</el-button
                >
                <el-button type="text" @click="detailClick(item)"
                  >替换</el-button
                >
                <el-button type="text" @click="delClick(item)">删除</el-button>
              </section>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>
    <detailDialogVue ref="detailDialogVue" />
  </hs-layout>
</template>
<script>
import leftListVue from './left-list.vue'
import hsLayout from '@/components/hs-layout'
import hsBreadcrumb from '@/components/hs-breadcrumb'
import detailDialogVue from './detail-dialog.vue'
const InitSearchForm = () => {
  return {
    pageNo: 1,
    pageSize: 10,
  }
}
export default {
  name: 'packages-manage',
  components: { leftListVue, hsLayout, hsBreadcrumb, detailDialogVue },
  data() {
    return {
      breadcrumbList: ['test', 'test'],
      searchForm: InitSearchForm(),
      pageList: [
        {
          id: '1' + Math.random(),
          cnName: '登录1',
          img: 'https://192.168.2.18/static/oss/hsja-platform-image/login/full-com/preview.png',
        },
        {
          id: '2' + Math.random(),
          cnName: '登录2',
          img: 'https://img2.baidu.com/it/u=1979633876,2912484447&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
        },
      ],
    }
  },
  created() {
    this.getDataList(1)
    this.pageList = [
      ...this.pageList,
      ...this.pageList,
      ...this.pageList,
      ...this.pageList,
      ...this.pageList,
      ...this.pageList,
      ...this.pageList,
      ...this.pageList,
      ...this.pageList,
    ]
  },
  methods: {
    detailClick() {
      this.$refs.detailDialogVue.show()
    },
    // 获取所有数据
    getDataList(pageNo) {
      pageNo && (this.searchForm.pageNo = pageNo)
      // let params = {
      //   ...this.searchForm,
      // }
      //   getDataByPage(params).then((res) => {
      //     this.tableList = res.records || []
      //     this.total = res.total || 0
      //     this.$nextTick(() => {
      //       this.$refs.tableRef.doLayout()
      //     })
      //   })
    },
  },
}
</script>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  width: calc(100% + 10px);
  ::v-deep .el-scrollbar__view {
    width: calc(100% - 10px);
  }
}
.single-box {
  box-shadow: 0px 3px 5px rgba(23, 22, 22, 0.1);
  border-radius: 4px;
  margin-bottom: 12px;
  .img-box {
    padding-bottom: 60%;
    position: relative;
  }
  .el-image {
    display: block;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .box-bottom {
    height: 40px;
    background-color: rgba(247, 249, 250, 0.39);
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
