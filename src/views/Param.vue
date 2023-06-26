<template>
<div>
  <el-form :inline="true">
    <el-form-item label="物料号">
      <el-select v-model="matnr" @change="get_param">
        <el-option v-for="i in matnrs" :label="i.matnr" :value="i.matnr" :key="i.matnr"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="data" max-height="850">
    <el-table-column label="参数名称" prop="param_type"></el-table-column>
    <el-table-column label="值" prop="value">
      <template slot-scope="scope">
        <el-input v-init v-model="scope.row.value" @blur="process(scope.row)"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="plc地址" prop="plc"></el-table-column>
    <el-table-column label="类型" prop="type"></el-table-column>
    <el-table-column label="参数类别" prop="category"></el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Param",
  data(){
    return{
    matnrs:[],
      matnr:'',
      data:[]
    }
  },
  methods:{
    process(row){
      if (row.type==='整数'){
        if(!(/^\d+$/.test(row.value))){
          this.$message.error('填写错误')
          return
        }
      }
      row.tag=true
    },
    save(){
      let path='http://192.168.0.4:6325/auto_experiment/param/update'

      this.$confirm('是否确认保存？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let temp=this.$store.state.filter({tag:true},this.data)
        if(temp.length===0){
          this.$message.error('没有需要保存的数据')
          return
        }
        let params={
          matnr:this.matnr,
          data:temp
        }
        axios.post(path,params).then(res=>{
          if (res.data.code===200){
            this.$message.success('保存成功')
          }

        })

      }).catch(() => {
        console.log('取消保存');
      });
      },
    get_matnrs(){
      let path='http://192.168.0.4:6325/auto_experiment/matnrs/get'
      axios.get(path).then(res=>{
        this.matnrs=res.data.data
      })
    },
    get_param(){
      let path='http://192.168.0.4:6325/auto_experiment/param/get'
      let params={
        matnr:this.matnr
      }
      axios.get(path,{params:params}).then(res=>{
        this.data=res.data.data
        this.data.forEach(item=>{
          item['tag']=false
        })
        this.data.sort(function(a, b) {
          return a.plc - b.plc;
        });
      })
    }
  },
  mounted() {
    this.get_matnrs()
  }
}
</script>

<style scoped>

</style>