<template>
<el-row>
    <el-col span="24" v-for="(item, index) of list" :key="index">
        <el-card shadow="hover">
            <span> {{item.name}} </span>
            <span> {{item.address}} </span>
        </el-card>
    </el-col>
</el-row>

</template>

<script>
export default {
    name: 'CollectPoiList',
    data() {
        return {
            list: []
        }
    },
    methods: {
        
    }
}
</script>