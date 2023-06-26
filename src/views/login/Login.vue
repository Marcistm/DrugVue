<template>
    <div class="login">
        <!-- 登录面板 -->
        <div class="login-box">
            <div class="login-box-title">
                药品管理系统
            </div>
            <div class="login-box-from">
                <el-form :model="loginForm" :rules="rules" ref="loginForm"  class="demo-ruleForm">
                    <el-form-item prop="username" label="账号">
                        <el-input v-model="loginForm.username"  size="medium">
                            <el-button slot="prepend" icon="el-icon-user"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <el-input v-model="loginForm.password"   size="medium" type="password">
                            <el-button slot="prepend" icon="el-icon-key"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" :loading="loading" style="width:100%" @click="submitForm('loginForm')">立即登陆</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
       
    </div>
   
</template>

<script>
import axios from 'axios'
import { setUser, setUserName} from "@/utils/auth";

export default {
    data(){
        let letterRule = (rule, value, callback) => {
            let reg = /^[a-zA-Z0-9_-]{4,18}$/
            if (value === '') {
                callback(new Error('输入内容不能为空'));
            }else if(!reg.test(value)) {
                callback(new Error('请输入字母、数字、下划线'));
            }else{
                callback();
            }
        };
        return {
            loading: false, //登陆状态
            loginForm:{  // 登陆表单
                username: '',
                password: ''
            },
            rules:{  //登陆验证规则
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' },
                    { validator: letterRule, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    { validator: letterRule, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{

      submitForm(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.loading = true
                  this.login()
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      login(){
        let path = 'http://192.168.0.4:6325/login'
        let param = {
          work_id: this.loginForm.username,
          password: this.loginForm.password
        }
        axios.get(path, { params: param, timeout: 300000 }).then(responses => {
          if (responses.data.code === 200) {
            if (responses.data.auto_privilege === '0') {
              this.loading = false
              this.$message.error('没有登录系统的权限，请向OA申请')
            } else {
              localStorage.setItem('permission', responses.data.auto_privilege)
              setUser(this.loginForm.username)
              this.$store
                  .dispatch('user/login',{token: responses.data.token})
                  .then(()=>{
                    this.loading = true
                    // 登陆成功后重定向
                    // 如果初次登录跳转到更改密码页面
                    setUserName(responses.data.name)

                    if (responses.data.has_login === 0) {
                      this.$router.push('/resetPass')

                      // this.$router.push({
                      //   path: this.$route.query.redirect || '/resetPass'
                      // })
                    }else {
                      this.$router.push('/home')
                    }

                  })
                  .catch(err=>{
                    this.loading = true
                    // console.log(err)
                  })
            }
          } else {
            this.loading = false
            this.$message.error(responses.data.msg)
          }
        }).catch(error => {
          this.loading = false
          this.$message.error('请求超时，请检查网络连接')
          console.log(error)
        })
      }
    }
}
</script>

<style scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh; /* 使用视口高度作为高度，避免滚动条出现 */
  width: 100%;
  background: url('../../assets/image/login.jpg');
  background-size: cover; /* 使用 cover 值将背景图像自适应容器大小 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box{
    width: 350px;
    /* height: 287px; */
    background: hsla(0,0%,100%,.3);
    border-radius: 5px;
    box-shadow: 0 0 2px #f7f7f7;
    border: 1px solid #f7f7f7;
}
.login-box-title{
    line-height: 50px;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    border-bottom: 1px solid #ffffff;
}
.login-box-from{
    width: 100%;
    height: auto;
    padding: 30px;
    box-sizing: border-box;
}
</style>