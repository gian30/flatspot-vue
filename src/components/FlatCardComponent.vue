<template>
	<div class="flat-card">
		<div class="flat-fav" @click="addFavourite()">
			<i v-if="!liked" class="far fa-heart"></i>
			<i v-else class="fas fa-heart"></i>
		</div>
		<div class="flat-price">{{formattedPrice}}</div>
		<a :href="flat.url" target="_blank" class="flat" :class="{'shadow-none': hideShadow}">
			<div class="flat__img">
				<img :src="flat.img" class="flat__img-image">
			</div>
			<div class="flat__main">
				<span class="flat-details">{{flat.locality}} | {{flat.area}} m2 | {{flat.rooms}} rooms</span>
				<div class="flat-title">
					{{flat.title}}
				</div>
			</div>
		</a>
	</div>
</template>
<script>
export default {
	props: {
		hideShadow: {
			type: Boolean,
			default: false
		},
		flat: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		liked: false
	}),
	computed: {
		formattedPrice() {

			return this.flat.price.toLocaleString('es-ES', {
				style: 'currency',
				currency: 'EUR',
			});
		}
	}, mounted() {
		this.$emit("loaded");
	},
}
</script>
<style >
.flat-card {
	position: relative;
	width: 100%;
}

.flat {
	display: block;
	background-color: #fff;
	position: relative;

	-webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.26);
	-moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.26);
	box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.26);
	cursor: pointer;
	transition: all 0.5s ease;
	border-radius: 10px;
}

.shadow-none {
	box-shadow: none !important;
}

.shadow-none:hover {
	box-shadow: none !important;
}


.flat:hover {
	-webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.37);
	-moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.37);
	box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.37);
}

.flat-title {
	color: #000;
	top: -13px;
	font-size: 17px;
	font-weight: 600;
	z-index: 1;
	margin-top: 10px;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 100%;
	height: 2em;
	white-space: nowrap;
}

.flat-details,
.flat-details:hover {
	font-size: 14px;
	color: #d6d6d6;
	font-weight: 500;
}

.flat-price {
	position: absolute;
	font-size: 14px;
	top: 10px;
	left: 10px;
	background-color: #1d56bc;
	z-index: 10;
	min-width: 60px;
	padding: 0 5px;
	height: 30px;
	color: #fff;
	cursor: pointer;
	border-radius: 5px;
	text-align: center;
	line-height: 30px;
	font-weight: bold;
}

.flat-fav {
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 10;
	cursor: pointer;
}

.flat-fav i {
	color: #fff;
	display: block;
	font-size: 24px;
	z-index: 20;
}

.flat-fav:hover i {
	color: #1d56bc;
}

.fas {
	color: #fff;
	font-size: 16px;
	margin: 0 1px;
}

.flat__img {
	position: relative;
}

.flat__img-image {
	border-radius: 10px 10px 0 0;
	width: 100%;
	height: 240px;
	background-repeat: no-repeat !important;
	background-size: cover !important;
	background-position: center !important;
	object-fit: cover;
}

.flat__main {
	padding: 15px 15px;
}

.flat__desc {
	padding: 10px 15px;
	font-weight: 300;
	font-size: 14px;
	text-align: center;
	color: #000;
	margin-bottom: 10px;
	line-height: 1.4em;
}

.flat__info {
	position: absolute;
	bottom: 10px;
	left: 10px;
	right: 10px;
}

.flat__info-box {
	background-color: #f2f2f2;
	padding: 5px;
	font-size: 12px;
	width: 110px;
	text-align: center;
	color: #797979;
}

.flat__info-box img {
	width: 17px;
}

h2 {
	text-transform: uppercase;
}
</style>