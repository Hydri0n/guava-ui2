<template>
<div class="el-card is-always-shadow">
        <img
          :src=image
          class="image"
        />
        <div style="padding: 14px">
          <span>{{ name }}</span>
          <div class="bottom">
            <div class="text-sm">{{ detail }}</div>
                <button class="el-button is-text button" aria-disabled="false" type="button">
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
        name: null,
        detail: null,
        image: null
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
  width: 300px;
  height: 300px;
}
</style>