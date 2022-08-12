<template>
  <div class="hello">
    <!-- <div>
      <el-autocomplete
        v-model="keyword"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      >
    <template #suffix>
      <el-icon class="el-input__icon">
        <edit />
      </el-icon>
    </template>
    <template #default="{ item }">
      <div class="value">{{ item.name }}</div>
      <span class="link">{{ item.district }}</span>
    </template>      
      </el-autocomplete>
      </div> -->
      <div style="width: 50%; margin: auto">
        <input class="el-input__inner" id="search-poi" placeholder="Please input" />
      </div>
      <p/>
    <div id="container"/>

  </div>
</template>

<script>
import AMap from 'AMap'
import createPoiWindow from './PoiWindow.js'

export default {
  name: 'GMap',
  data() {
    return {
      map: {},
      autocomplete: {},
      city: '南昌',
      aimMarker: null,
      markerEnableTag: false //
    }
  },
  props: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 800
    }
  },
  methods: {
      handleSelect(item) {
        console.log(item)
    },
      addPOi(name) {
    console.log("child addPOi", name)
  },
    querySearch(key, cb) {
        this.autocomplete.search(key, function(status, result) {
            console.log(key, result);
            cb(result.tips);

        })
    },
    setAimMarker(lng, lat, markerName) {
          let markerPoint = new AMap.Marker({
          position: new AMap.LngLat(lng, lat),
          title: markerName,
          draggable: true, //点标记对象是否可拖拽移动
          defaultCursor: 'pointer'
        });
        
        if (this.aimMarker != null) {
          this.map.remove(this.aimMarker);
        }
        this.map.add(markerPoint)
        this.aimMarker = markerPoint
    },
    callback_openDetailWindow(poiDetail) {
      if (this.aimMarker != null) {
        this.map.setCenter(this.aimMarker.getPosition());
        if (this.map.getZoom() < 14) {
          this.map.setZoom(14);
        }
        let photos = poiDetail.photos;
        var image = (photos.length == 0) ? '../assets/logo.png' : photos[0].url;
        var infoWindow = new AMap.InfoWindow({
          isCustom: true,  //使用自定义窗体
          content: createPoiWindow(poiDetail.name, poiDetail.address, image),
        });
        infoWindow.open(this.map, this.aimMarker.getPosition());
        this.markerEnableTag = true;
        console.log(1);
      }
    },
    addPoiToList(poi) {
      this.$parent.$emit(poi)
    },
    createInfoWindow(title, content, image) {
    var info = document.createElement("el-card");

    var poiImg = document.createElement("img");
    poiImg.src = image;
    info.appendChild(poiImg);

    //可以通过下面的方式修改自定义窗体的宽高
    //info.style.width = "400px";
    // 定义顶部标题
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src = "https://webapi.amap.com/images/close2.gif";
    closeX.onclick = this.closeInfoWindow;

    top.appendChild(titleD);
    top.appendChild(closeX);
    info.appendChild(top);

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;
    info.appendChild(middle);

    return info;
    },
    closeInfoWindow() {
      this.map.clearInfoWindow();
    },
    initMap() {
      this.markerEnableTag = false
        let self = this
        let map = new AMap.Map('container', {
          resizeEnable: true,
          zoom: 10,
          mapStyle: 'amap://styles/b9b479a9c7e46250b27b2805b0a9b2e3'
        })

        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
        const autoOptions = {
          // 使用联想输入的input的div的id
          input: 'search-poi',
          city: map.getAdcode()
        }
        const autocomplete = new AMap.Autocomplete(autoOptions)
        self.autocomplete = autocomplete
        const placeSearch = new AMap.PlaceSearch({
          autoFitView: true,
          extensions: 'all'
        })
        // AMap.event.addListener(autocomplete, 'complete', function(e) {

        // })
        AMap.event.addListener(autocomplete, 'select', function(e) {
          // let aimPoi = placeSearch.getDetails(e.poi.id)
          // console.log(JSON.stringify(aimPoi))
          self.setAimMarker(e.poi.location.lng, e.poi.location.lat, e.poi.name)
          placeSearch.getDetails(e.poi.id, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                let poi = result.poiList.pois[0]
                console.log(poi)
                self.callback_openDetailWindow(poi);
              }
          });
        })
        map.on('hotspotclick', function(result) {
          console.log("xxx   ", result)
          self.markerEnableTag = false;
          self.setAimMarker(result.lnglat.lng, result.lnglat.lat, result.name)
          placeSearch.getDetails(result.id, function(status, result) {
            console.log("aaa   ", result)
            if (status === 'complete' && result.info === 'OK') {
                let poi = result.poiList.pois[0]
                console.log("bbb   ", poi)
                self.callback_openDetailWindow(poi);
            }
        });
     })
     map.on('click', function() {
      console.log("click!!   ", self.markerEnableTag)
      if (self.markerEnableTag) {
        self.closeInfoWindow()
        self.markerEnableTag = false;
      }
     })
    })

        self.map = map
    }
  },
  mounted() {
    this.initMap()
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#container {width:1280px; height: 720px; margin: auto; }
</style>
