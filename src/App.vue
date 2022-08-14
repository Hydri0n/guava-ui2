<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <h3>松哥の地图</h3>
    <el-rate v-model="value"/>
    <p/>
  <el-row>
    <el-col :span="20">
      <div class="grid-content ep-bg-purple">
        <DefaultMap :height="1800" :width="1800" @add-poi="addPoiToList"/>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content ep-bg-purple">
        <CollectPoiList/>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import DefaultMap from './components/DefaultMap.vue'
import CollectPoiList from './components/CollectPoiList.vue'

export default {
  data() {
    return {
        value : 5
    }
  },
  name: 'App',
  components: {
    DefaultMap,
    CollectPoiList
},
method: {
  addPoiToList(name) {
    console.log("parent addPOi", name)

  }
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#div {
  margin: auto;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
