<template>
  <div class="login">
    <div class="login-box">
      <div class="login-box-from">
        <el-button type="primary" size="medium" style="width:100%; height: 100px;font-size: 48px;" @click="toParam">参数设置</el-button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      count: 0,
      test_str: 'test_str'
    }
  },
  methods:{

    toParam() {
      this.$router.push('/param')
    },

  }
}
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box{

  /* height: 287px; */
  background: hsla(0,0%,100%,.3);
  border-radius: 5px;
  box-shadow: 0 0 2px #f7f7f7;
  border: 1px solid #f7f7f7;
}
.login-box-from{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>