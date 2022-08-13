<template>
<div class="el-card is-always-shadow swindow">
        <div class="image-box">
        <img
          :src=image class="image"
        />
        </div>

        <div style="padding: 14px">
          <span>{{ poiDetail.name }}</span>
          <div class="bottom">
            <div class="text-sm">{{ poiDetail.detail }}</div>
                <button class="el-button is-text button" aria-disabled="false" type="button" @click="addPoi">
                    <span class="">添加</span>
                </button>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    name: 'poiWindow',
props: {
        poiDetail: null,
        image: null,
        cb: { type: Function }
    },
    methods: {
      addPoi() {
        console.log(">>>>>", this.cb)
        this.cb(this.poiDetail);
      }
    }
}

</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
    margin: auto;
  display: block;
  width: 240px;
  height: 240px;
}

.swindow {
  opacity: 0.9;
}

.image-box {
  background-size: auto;
}
</style>