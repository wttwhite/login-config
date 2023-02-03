<template>
  <div></div>
</template>
<script>
export default {
  name: 'page-manage',
  created() {
    this.$router.push({
      name: 'page-manage-config',
    })
  },
}
</script>
<style lang="scss" scoped></style>
