<template>
	<div class="container map-container" id="flats-map" v-if="!mapLoading">
		<ol-map style="height:600px" v-if="mapFlats.length > 0" @click="selectedFlat = null">
			<ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="'EPSG:4326'" />
			<ol-tile-layer>
				<ol-source-osm />
			</ol-tile-layer>
			<ol-vector-layer>
				<ol-source-vector>
					<ol-feature v-for="(flat, index) in mapFlats" :key="index">
						<ol-geom-point :coordinates="[flat.lng, flat.lat]">
						</ol-geom-point>
						<ol-style>
							<ol-style-icon :src="markerIcon" :scale="1"></ol-style-icon>
						</ol-style>
					</ol-feature>
					<ol-feature v-for="(flat, index) in mapFlats" :key="index">
						<ol-interaction-select @select="showFlat($event, flat)">
							<ol-geom-point :coordinates="[flat.lng, flat.lat]">
							</ol-geom-point>
							<ol-style>
								<ol-style-icon :src="markerIcon" :scale="1"></ol-style-icon>
							</ol-style>
						</ol-interaction-select>
					</ol-feature>
					<ol-overlay :position="[selectedFlat.lng, selectedFlat.lat]" v-if="selectedFlat">
						<template v-slot="slotProps">
							<div class="overlay-content">
								<FlatCardComponent :cords="{slotProps}" :flat="selectedFlat" :hideShadow="true">
								</FlatCardComponent>
							</div>
						</template>
					</ol-overlay>
				</ol-source-vector>
			</ol-vector-layer>
		</ol-map>
	</div>
	<div class="container">
		<div class="row">
			<div class="d-flex justify-content-center" v-if="mapLoading">
				<LoadingSpinnerComponent></LoadingSpinnerComponent>
			</div>
		</div>
	</div>
</template>
<script>


import Flat from '../store/flats';
import { mapActions, mapState } from 'pinia';
import markerIcon from '@/assets/icons/marker.svg'
import FlatCardComponent from './FlatCardComponent.vue';
//LkC6S09AZGDQlsmYG6VJ
export default {
	data() {
		return {
			zoom: 10,
			rotation: 0,
			overlayCoordinate: [40, 30],
			markerIcon: markerIcon,
			selectedFlat: null,
		};
	},
	computed: {
		...mapState(Flat, ["mapFlats"]),
		...mapState(Flat, ["mapLoading"]),
		center() {
			return [this.mapFlats[0].lng, this.mapFlats[0].lat];
		},

	},
	methods: {
		...mapActions(Flat, ["fetchMapFlats"]),
		showFlat(event, flat) {
			this.selectedFlat = flat;
		}
	},
	created() {
		this.fetchMapFlats();
	},
	components: { FlatCardComponent }
}
</script>
<style lang="scss">
.map-container .ol-viewport {
	border-radius: 10px;

}

.overlay-content {
	position: relative;
	top: -370px;
	left: 30px;

	.flat-card {
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
</style>