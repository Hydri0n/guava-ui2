<template>
<el-row>
    <el-col :span="24" v-for="(item, index) in map" :key="index">
        <el-card shadow="hover">
            <el-row @click="showEditPanel(index)">
                <el-col :span="18">
                    <div> {{item.name}} </div>
                    <div class="address"> {{item.address}} </div>
                </el-col>
                <el-col :span="6">
                    <el-button  class="el-icon-delete" circle @click="deletePoi(index)"/>

                </el-col>
            </el-row>
            <div v-show="item.showEdit">
                <div class="edit-block">
                    <el-row>
                        <el-col :span="6"><div class="edit-text">标签</div></el-col>
                        <el-col :span="18">
                              <el-autocomplete class="edit-operate edit-tag" v-model="item.tag" :fetch-suggestions="tagList" 
                              popper-class="my-autocomplete" clearable="true"/>
                        </el-col>
                    </el-row>
                </div>
                <div class="edit-block">
                    <el-row>
                        <el-col :span="6"><div class="edit-text">评级</div></el-col>
                        <el-col :span="18"><el-rate v-model="item.rate" class="edit-operate"/></el-col>
                    </el-row>
                </div>
            </div>
        </el-card>
    </el-col>
</el-row>

</template>

<script>
import bus from "@/utils/bus";

export default {
  name: "CollectPoiList",
  data() {
    return {
      idSet: new Set(),
      showEdit: [],
      currentOpenItem: -1,
      map: [],
    };
  },
  methods: {
    showEditPanel(index) {
      console.log("click panel!!");
      for (let i = 0; i < this.map.length; i++) {
        if (i != index) {
          this.map[i].showEdit = false;
        } else {
          if (this.currentOpenItem == i) {
            this.map[i].showEdit = false;
            this.currentOpenItem = -1;
            break;
          }
          this.map[i].showEdit = true;
          this.currentOpenItem = i;
        }
      }
    },
    tagList(s, cb) {
        var result;
        console.log(s)
        if (s != '') {
            result = []
        } else {
            console.log("????")
            result = [{value:'abc'}, {value:'123'}]
        }
        cb(result);
    },
    addPoi(poi) {
      console.log("list>>>>  ", poi);
      let existPoi = false;
      for (let i = 0; i < this.map.length; i++) {
        if (this.map[i].id == poi.id) {
          existPoi = true;
          break;
        }
      }
      if (!existPoi) {
        // var index = poi.id
        let data = this.convertPoiToData(poi);
        this.map.push(data);
      }
      console.log(this.map);
    },
    convertPoiToData(poi) {
      var data = {
        id: poi.id,
        name: poi.name,
        address: poi.address,
        rate: 0,
        showEdit: false,
        tag: "",
        tagColor: null,
      };
      return data;
    },
    deletePoi(index) {
      console.log("delete >>> ", index);
      this.map.splice(index, 1);
    },
  },
  mounted() {
    bus.on("addPoiToList", this.addPoi);
  },
};
</script>

<style>
.edit-block {
  padding: 5px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  box-sizing: border-box;
  align-items: center;
}
.address {
  font-size: 12px;
  color: #999;
}
.edit-text {
  font-size: 10pt;
  text-align: left;
  color: #999;
}
.edit-operate {
  text-align: right;
    float: right;
}
.edit-tag {
    height: 40%;
    width: 60%;
}
.el-input__inner {
    text-align: center;
}
</style>