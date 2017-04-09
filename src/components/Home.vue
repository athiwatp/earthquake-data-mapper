<template>
  <div>
      <gmap-map
    :center="center"
    :zoom="3"
    :mapTypeId="'terrain'"
    :options="{styles: mapStyle}"
    style="width: 100%; height: 92vh;"
  >
      <!--<gmap-marker
        v-for="m in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        :icon="iconUrl"
        @click="center=m.position"
      ></gmap-marker>-->
      <gmap-circle
        v-for="(m, index) in markers"
        :key="m"
        :center ="m.position"
        :radius="m.position.radius"
        :options="circlSettings"
        :clickable="true"
        @click="openMarker(index)"
        
    >
    </gmap-circle>
    
    </gmap-map>


  <v-modal v-model="modal" persistent>
    <v-card class="blue">
      <v-card-text>
        <h2 class="title white--text">Loading earthquake points...</h2>
      </v-card-text>
    </v-card>
  </v-modal>

 <v-modal v-model="markerModal" persistent>
    <v-card style="width:450px">
      <v-card-text class="blue darken-1">
        <h2 class="title white--text">{{markerDetails.place}}</h2>
      </v-card-text>
      <v-card-text class="subheading grey--text">
        <v-row>
            <v-col xl2 md2 xs12>
                <h3>{{markerDetails.mag}}</h3>
            </v-col>
            <v-col xl10 md10 xs12>
                <p>Earthquake on {{markerDetails.time | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</p>
            </v-col>
        </v-row>
        <p class="red--text">Distance from you: {{distanceFromYou(myCoords.lat, myCoords.long, markerDetails.lat, markerDetails.lng)}} kilometers</p>
      </v-card-text>
      <v-card-row actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="markerModal = false" class="primary--text">Close</v-btn>
      </v-card-row>
    </v-card>
  </v-modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      circlSettings: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      },
      modal: true,
      markerModal: false,
      markerDetails: {},
      myCoords: {
          lat: null,
          long: null
      },
      iconUrl: './static/earthquake.png',
      center: {
        lat: 16.436085,
        lng: 121.275879
      },
      markers: [],
      mapStyle: [{
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{
              "saturation": 36
            },
            {
              "color": "#000000"
            },
            {
              "lightness": 40
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [{
              "visibility": "on"
            },
            {
              "color": "#000000"
            },
            {
              "lightness": 16
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 20
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 17
            },
            {
              "weight": 1.2
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 20
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 21
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 17
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 29
            },
            {
              "weight": 0.2
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 18
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 16
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 19
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
            },
            {
              "lightness": 17
            }
          ]
        }
      ]
    }
  },
  created() {
    this.loadMarkers()
    this.getLocation()

  },
  methods: {
    loadMarkers() {
      var _this = this
      this.$http.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson').then(response => {
        response.data.features.forEach(function (record) {
          _this.markers.push({
            position: {
              lat: record.geometry.coordinates[1],
              lng: record.geometry.coordinates[0],
              radius: (Math.exp(record.properties.mag/1.01-0.13))*1000,
              time: record.properties.time,
              place: record.properties.place,
              mag: record.properties.mag
            }
          })
        })
        setTimeout(function () {
          _this.modal = false
        }, 5000);
        console.log(response.data.features.length)
      }, response => {
        console.log('Error')
      });
    },
    openMarker(index) {
    console.log(index)
    this.markerDetails = this.markers[index].position
     this.markerModal = true
     console.log(this.markerDetails)
    },
    distanceFromYou(lat1,lon1,lat2,lon2) {
        var R = 6371 // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1) // deg2rad below
        var dLon = this.deg2rad(lon2-lon1)
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return Math.round(d * 100) / 100;
    },
    deg2rad(deg) {
        return deg * (Math.PI/180)
    },
    getLocation() {
        var _this = this
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                _this.myCoords.lat = position.coords.latitude
                _this.myCoords.long = position.coords.longitude
            });
        } else { 
            alert('Geolocation is not supported by this browser.');
        }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
