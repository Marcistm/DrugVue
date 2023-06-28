<template>
<div>
  <el-form :inline="true" v-permission="['worker','admin']">
    <el-form-item>
      <el-button type="success" @click="openDialog('add')">新增</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="data" max-height="850">
    <el-table-column :key="i" v-for="i in (0,table[0].value.length)" :label="table[0].value[i-1].label" :prop="table[0].value[i-1].value">
    </el-table-column>
    <el-table-column label="操作" v-permission="['worker','admin']">
      <template slot-scope="scope">
        <el-button type="primary" @click="openDialog('update',scope.$index)">修改</el-button>
        <el-button type="danger" @click="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :visible.sync="dialog" draggable>
    <el-form :inline="true">
      <el-form-item :key="i" v-for="i in (0,table[0].value.length)" :label="table[0].value[i-1].label">
        <el-input v-model="dialogData[table[0].value[i-1].value]"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add_update">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Param",
  data(){
    return{
      dialog:false,
      filter_table:[
        {table:'Grug',value:[{label:'编号',value:'GrNo'},{label:'名称',value:'GrName'},{label:'类型',value:'GrType'},
            {label:'价格',value:'GrPrice'},{label:'保质期',value:'Gstodate'},{label:'时间',value:'GrDate'}]},
        {table:'Customer',value:[{label:'编号',value:'CusNo'},{label:'姓名',value:'CusName'},{label:'年龄',value:'Cusage'},
            {label:'电话',value:'CusTel'},]},
        {table:'Employee',value:[{label:'编号',value:'EmpNo'},{label:'姓名',value:'EmpName'},{label:'年龄',value:'Empage'},
            {label:'职位',value:'EmpType'},]},
        {
        table:'Supplier',value:[{label:'编号',value:'SupNo'},{label:'姓名',value:'SupName'},{label:'电话',value:'SupTel'},]
        },
        {
          table: 'Store',
          value: [
            { label: '编号', value: 'StoNo' },
            { label: '仓库编号', value: 'StoNo' },
            { label: '员工编号', value: 'EmpNo' },
            { label: '仓库当前库存', value: 'StoNow' },
            { label: '仓库最小库存', value: 'StoMin' },
            { label: '仓库最大库存', value: 'StoMax' },
            { label: '进货日期', value: 'JHDate' }
          ]
        },
        {
          table: "Stock",
          value: [
            { label: "SupNo", value: "供应商编号" },
            { label: "EmpNo", value: "员工编号" },
            { label: "GrNo", value: "药品编号" },
            { label: "GrNumber", value: "药品数量" },
            { label: "unit", value: "单位" },
            { label: "Grprice", value: "药品价格" },
            { label: "JHDate", value: "进货日期" }
          ]
        },
        {
          table: 'Sale',
          value: [
            { label: '员工编号', value: 'EmpNo' },
            { label: '药品编号', value: 'GrNo' },
            { label: '顾客编号', value: 'CusNo' },
            { label: '顾客姓名', value: 'CusName' },
            { label: '药品价格', value: 'GrPrice' },
            { label: '药品数量', value: 'GrNumber' },
            { label: '单位', value: 'unit' },
            { label: '售货日期', value: 'SHDate' }
          ]
        },
        {
          table: 'StReturn',
          value: [
            { label: '供应商编号', value: 'SupNo' },
            { label: '员工编号', value: 'EmpNo' },
            { label: '药品编号', value: 'GrNo' },
            { label: '药品数量', value: 'GrNmber' },
            { label: '单位', value: 'unit' },
            { label: '药品价格', value: 'GrPrice' },
            { label: '退货日期', value: 'THDate' }
          ]
        },
        {
          table: 'CuReturn',
          value: [
            { label: '员工编号', value: 'EmpNo' },
            { label: '药品编号', value: 'GrNo' },
            { label: '顾客编号', value: 'CusNo' },
            { label: '顾客姓名', value: 'CusName' },
            { label: '药品数量', value: 'GrNumber' },
            { label: '单位', value: 'unit' },
            { label: '顾客退货日期', value: 'GTHDate' }
          ]
        }


      ],
      data:[],
      table:[],
      name:'',
      dialogData:{},
    }
  },
  methods:{
    add_update(){
      let t=[]
      t.push(this.dialogData)
      let params={}
      params['data']=t
      params['table']=this.table[0].table
      params['col']=this.table[0].value[0].value
      let path=''
      let text=''
      if (this.type==='add'){
        path='http://127.0.0.1:5000/auto_experiment/add'
        text='新增'
      }
      if (this.type==='update'){
        path='http://127.0.0.1:5000/auto_experiment/update'
        text='更新'
      }
      axios.post(path,params).then(res=>{
        if (res.data.code===200){
          this.$message({
            type: 'success',
            message: text+'成功',
            showClose:true
          });
        }
      })
      this.dialog=false
      if (this.type==='add'){
        location.reload()
      }
    },
    openDialog(type,index){
      this.dialog=true
      if (type==='add'){
        this.dialogData={}
      }
      if (type==='update'){
        this.dialogData=this.data[index]
      }
      this.type=type

    },
    del(row){
      let path='http://127.0.0.1:5000/del'
      let params={table:this.name,no:row[this.table[0].value[0].value],col:this.table[0].value[0].value}
      axios.get(path,{params:params}).then(res=>{
        if (res.data.code===200) {
          this.$message.success('删除成功')
        }
      })
    },
    get_param(){
      let path='http://127.0.0.1:5000/get'
      let params={table:this.name}
      console.log(params)
      axios.get(path,{params:params}).then(res=>{
        this.data=res.data.data
      })
    }
  },
  mounted() {

    this.name=this.$route.query.name
    this.table=this.$store.state.filter({table:this.name},this.filter_table)
    this.get_param()
  }
}
</script>

<style scoped>

</style>