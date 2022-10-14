<template>
	<div class="container map-container" id="flats-map">
		<div id="map" style="height: 600px;"></div>
	</div>
	<div class="d-none">
		<FlatCardComponent @loaded="this.showFlatsOnMap()" v-if="mapFlats && mapFlats.length > 0" id="flat-card"
			ref="flat-card" :flat="currentFlat">
		</FlatCardComponent>
	</div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import Flat from '../store/flats';
import L from 'leaflet'
import FlatCardComponent from './FlatCardComponent.vue';
import icon from '@/assets/icons/marker.svg';
export default {
	components: {
		FlatCardComponent
	},
	data() {
		return {
			map: null,
			currentFlat: null,

		};
	},
	created() {
		this.fetchMapFlats();
	},
	computed: {
		...mapState(Flat, ["mapFlats"]),

	},
	methods: {
		...mapActions(Flat, ["fetchMapFlats"]),
		showFlatsOnMap() {
			this.map = L.map('map').setView([51.505, -0.09], 13);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

			}).addTo(this.map);
			console.log(icon);
			var greenIcon = L.icon({
				iconUrl: icon,
				iconSize: [25, 70],
				iconAnchor: [12, 50],
				popupAnchor: [0, -30],
			});
			const element = document.getElementById('flat-card');


			this.mapFlats.forEach((flat) => {
				this.map.setView([flat.lat, flat.lng], 10);
				const marker = L.marker([flat.lat, flat.lng], { icon: greenIcon });
				marker.addEventListener('click', () => {
					this.currentFlat = flat;
					marker.bindPopup(element, { minWidth: 384, maxWidth: 384 })
						.openPopup();
				});
				marker.addTo(this.map);
			});

		}
	},
	watch: {
		mapFlats() {
			this.currentFlat = this.mapFlats[0];
			// this.showFlatsOnMap();

		}
	}

};
</script>
  
<style lang="scss">
.map-container {
	padding: 20px 0 60px 0;

	#map {
		border-radius: 10px;

	}
}

.leaflet-popup {
	.leaflet-popup-close-button {
		display: none;
	}
}

.leaflet-popup-content-wrapper {
	padding: 0 !important;
	box-shadow: none !important;

	.leaflet-popup-content {
		width: 100%;
		margin: 0;

		.flat {
			padding: 0;
		}
	}
}

.overlay-content {
	position: relative;
	top: -370px;

	.flat-card#flat-card {
		a.flat {
			box-shadow: none;
		}

		&::after {
			content: '';
			background-image: url(../assets/icons/left-card-arrow.svg);
			display: block;
			float: right;
			position: relative;
			width: 20px;
			line-height: 0;
			left: -13px;
			bottom: 0px;
			height: 50px;
			position: absolute;
		}
	}
}

@media (max-width: 768px) {
	.map-container #map {
		border-radius: 0px;
	}
}
</style>