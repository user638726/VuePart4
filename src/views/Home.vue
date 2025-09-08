<template>
  <div>
    <h1>高雄輕軌站點</h1>
    <div id="mapping"></div>
    <button class="clear-btn" @click="clearMarkers">清除所有標記</button>
    <ul class="station-list">
      <li
        class="station-card"
        v-for="station in stations"
        :key="station.車站編號"
        @click="addMarker(station)"
      >
        <b>{{ station.車站中文名稱 }}</b
        ><br />
        經度：{{ station.Longitude }}<br />
        緯度：{{ station.Latitude }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as L from 'leaflet'
import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface RawStation {
  車站編號: string
  車站中文名稱: string
  車站英文名稱: string
  Longitude: string
  Latitude: string
}

interface Station {
  車站編號: string
  車站中文名稱: string
  車站英文名稱: string
  Longitude: number
  Latitude: number
}

export default defineComponent({
  data() {
    return {
      map: null as LeafletMap | null,
      markers: [] as L.Marker[],
      stations: [] as Station[],
    }
  },
  mounted() {
    this.map = L.map('mapping').setView([22.6273, 120.3014], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map as L.Map)

    this.fetchStations()
  },
  methods: {
    async fetchStations() {
      const res = await fetch('/api')
      const result = await res.json()
      const data = Array.isArray(result) ? result : result.Data

      this.stations = (data as RawStation[]).map(
        (s): Station => ({
          車站編號: s.車站編號,
          車站中文名稱: s.車站中文名稱,
          車站英文名稱: s.車站英文名稱,
          Longitude: parseFloat(s.Longitude),
          Latitude: parseFloat(s.Latitude),
        }),
      )
    },

    addMarker(station: Station) {
      if (!this.map) return

      const m: L.Marker = L.marker([station.Latitude, station.Longitude])
        .addTo(this.map as L.Map)
        .bindPopup(`<b>${station.車站中文名稱}</b><br>${station.車站英文名稱}`)
        .openPopup()

      this.markers.push(m)
      this.map.setView([station.Latitude, station.Longitude], 16)
    },

    clearMarkers() {

      for (const m of this.markers) {
        m.remove()
      }

      this.markers = []
    },
  },
})
</script>


<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  margin-top: 20px;
}
#mapping {
  height: 400px;
  margin: 10px;
}
.station-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}
.station-card {
  width: 22%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  box-shadow: 1px 1px 10px #aaa;
  cursor: pointer;
  transition: 0.3s;
  list-style: none;
}
.station-card:hover {
  background-color: lightgreen;
  font-weight: bold;
}
.clear-btn {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #f00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .station-card {
    width: 90%;
  }
}
</style>
