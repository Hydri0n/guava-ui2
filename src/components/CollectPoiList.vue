<template>
<el-row>
    <el-col :span="24" v-for="(item, index) in map" :key="index">
        <el-card shadow="hover">
            <el-row>
                <el-col :span="18">
                    <div> {{item.name}} </div>
                    <div class="address"> {{item.address}} </div>
                </el-col>
                <el-col :span="6">
                    <el-button  class="el-icon-delete" circle @click="deletePoi(index)"/>

                </el-col>
            </el-row>

        </el-card>
    </el-col>
</el-row>

</template>

<script>
import bus from '@/utils/bus'
import { Delete } from '@element-plus/icons-vue'

export default {
    name: 'CollectPoiList',
    data() {
        return {
            idSet: new Set(),
            map: []
        }
    },
    methods: {
        Delete() {
            return Delete
        },
        addPoi(poi) {
            console.log("list>>>>  ", poi)
            let existPoi = false;
            for (let i = 0; i < this.map.length; i++) {
                if (this.map[i].id == poi.id) {
                    existPoi = true;
                    break;
                }
            }
            if (!existPoi) {
                this.idSet.add(poi.id)
                // var index = poi.id
                this.map.push(poi)
            }
            console.log(this.map)
        },
        deletePoi(index) {
            console.log('delete >>> ', index)
            this.map.splice(index, 1)
            console.log(this.map)

        }
    },
    mounted() {
        bus.on("addPoiToList", this.addPoi)
    }
}
</script>

<style>
    .address {
        font-size: 12px;
        color: #999;
    }
</style>