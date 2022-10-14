<template>
	<div class="navbar-offset" id="find"></div>
	<nav class="navbar navbar-expand-lg">
		<div class="container">
			<a class="navbar-brand" href=""><img src="@/assets/logo.png" alt="FlatSpot - Flat finder" /></a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#headerNavbar" aria-controls="headerNavbar" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="headerNavbar">
				<ul class="navbar-nav m-auto">
					<li class="nav-item">
						<router-link to="/#find" class="header__nav-item">Find flat</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/#flats" class="header__nav-item">Flats</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/#flats-map" class="header__nav-item">Flats map</router-link>
					</li>
				</ul>
			</div>
			<div class="search-bar">
				<SearchInputComponent width="400px" v-model="search" placeholder="Search" />
			</div>
		</div>
	</nav>
</template>
<script>
import SearchInputComponent from '@/components/elements/SearchInputComponent.vue'
import Flat from '../store/flats';
import { mapActions } from 'pinia';

export default {
	data() {
		return {
			search: '',
			timeoutQuery: null
		}
	},
	methods: {
		...mapActions(Flat, ["searchFlats"]),
		...mapActions(Flat, ["activateLoading"]),
	},
	components: {
		SearchInputComponent
	},
	watch: {
		search: function (val) {
			this.activateLoading()
			if (this.timeoutQuery) { clearTimeout(this.timeoutQuery) }
			this.timeoutQuery = setTimeout(() => {
				this.searchFlats(val)
			}, 300)
		}
	},
}
</script>

<style lang="scss" scoped>
.navbar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background-color: #fff;
	transition: all 0.3s ease-in-out;
}

.navbar-offset {
	height: 70px;
}

.navbar-brand {
	img {
		width: 200px;
		object-fit: contain;
	}
}

.navbar-nav {
	.header__nav-item {
		font-weight: 600;
		font-size: 16px;
		line-height: 26px;
		color: #373737;
		border-radius: 5px;
		padding: 3px 10px;
		margin-right: 30px;
		&:hover {
			background-color: #1d56bc;
			color: #fff;
		}
	}
}

.menu-link {
	margin-right: 30px;
}

.menu-item a {}

.menu-item a:hover {
	background-color: #1d56bc;
	color: #fff;
}

@media (max-width: 991px) {
	.navbar-toggler {
		order: 2;
	}
}

@media (max-width: 768px) {

	.search-bar {
		width: 100%;
	}

	.navbar-toggler {
		order: 0;
	}

	.search-bar {
		order: 2;
	}

	.header__nav-item {
		font-weight: 600;
		font-size: 16px;
		line-height: 26px;
		color: #373737;
		width: 100%;
		margin: auto;
		text-align: center;
		display: block;
		border-radius: 5px;
		padding: 3px 10px;
		margin-right: 30px;
	}
}
</style>
