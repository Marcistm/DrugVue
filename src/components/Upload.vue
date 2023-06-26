<template>
    <el-upload
        ref="upload"
        :auto-upload="false"
        :action="'http://192.168.1.6:6325/sop-map/data/get'"
        :file-list="list"
        :on-change="handleChange"
        :on-remove="handleRemove"
        show-file-list
    >
      <el-button type="primary">上传</el-button>
    </el-upload>
</template>

<script>
export default {
  name: "Upload",
  watch: {
    files: {
      deep: true,
      immediate:true,
      handler(newVal) {
        this.file_path = newVal;
        this.list=[]
        if(this.file_path!==''&this.file_path!==undefined){
          let t=this.file_path.split(',')
          if (t.length>0){
            t.forEach(item=>{
              let fileObj = {
                uid: Math.random(),
                name: item,
                url: item
              }
              this.list.push(fileObj)
            })
          }
        }
      },
    },
  },
  props:{
    files:String,
  },
  data(){
    return{
      list:[],
      file_path:''
    }
  },
  methods:{

    handleRemove(file, fileList) {
      this.list=fileList
    },
    handleChange(file, fileList) {
      this.list = fileList
    },
  },

}
</script>

<style scoped>

</style>