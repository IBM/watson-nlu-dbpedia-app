<template>
	<div class="demo">
  <div class="google-map" :id="mapId"></div>
  </div>
</template>

<script>
import { colors } from '../config'
export default {
  name: 'google-map',
  props: {
    mapId: {
      default: 'map-view',
    },
    entities: {
      default: [],
    },
  },
  data() {
    return {
      map: null,
      allMarkers: [],
      center: {
        lat: 48.853,
        lng: 2.298,
      },
      zoom: 5,
    }
  },
  watch: {
    entities(values, old) {
      this.updateMarkers()
    },
  },
  methods: {
    updateMarkers() {
      this.clearMarkers()
      this.addMarkersForEntities()
      this.fitToBounds()
    },

    addMarkersForEntities(entities) {
      this.entities.forEach(e => {
        const { lat, long: lng } = e.db_pedia
        this.addMarker({
          position: { lat, lng },
          title: e.entity.text,
        })
      })
    },

    addMarker({ position, title }) {
      this.allMarkers.push(
        new google.maps.Marker({
          position,
          title,
          animation: google.maps.Animation.DROP,
          icon: {
            url: `https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small_withshadow&chld=glyphish_map-marker|bb|${title}|FFFFFF|000000`,
          },
          map: this.map,
        })
      )
    },

    clearMarkers() {
      this.setMapOnAll(null)
      this.allMarkers = []
    },

    setMapOnAll(map) {
      this.allMarkers.forEach(m => m.setMap(map))
    },

    fitToBounds() {
      const map = this.map
      const geos = this.entities.map(e => ({
        lat: e.db_pedia.lat,
        lng: e.db_pedia.long,
      }))
      const centerOnGeos = geos => {
        if (geos.length === 1) map.setCenter(geos[0])
        else if (geos.length > 1) {
          const bounds = geos.reduce(
            (b, geo) => b.extend(geo),
            new google.maps.LatLngBounds()
          )
          map.fitBounds(bounds)
          map.panToBounds(bounds)
        }
      }
      centerOnGeos(geos)
    },

    createMap(options) {
      const element = document.getElementById(this.mapId)
      const map = new google.maps.Map(element, options)
      const opts = [
        {
          stylers: [
            { hue: colors.secondary.hex }, //'#CD5C5C' },
            { gamma: 0.5 },
            { weight: 0.5 },
          ],
        },
        {
          featureType: 'water',
          stylers: [
            { color: colors.primary.hex }, //'#272b30' }
          ],
        },
      ]

      map.mapTypes.set(
        'custom_style',
        new google.maps.StyledMapType(opts, {
          name: 'Custom Style',
        })
      )

      map.setMapTypeId('custom_style')

      this.map = map
    },
    onIdle() {},
    onClick() {},
  },
  mounted: function() {
    const options = {
      center: this.center,
      zoom: this.zoom,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'custom_style'],
      },
    }

    this.createMap(options)
    this.updateMarkers()
  },
}
</script>

<style scoped>
.map {
  flex: 100% 1 1;
}
.demo {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.google-map {
  flex: 100% 1 1;
}
</style>