<template>
	<div class="main">
		<div class="main-image">
		</div>
		<div class="container">
			<div :v-if="titleVisible" class="row">
				<div class="col-lg-12">
					<h2 class="second-title">
						Flatspot - best flat finder of the internet
					</h2>
					<h1 class="main-title">
						Find your dream flat <br>with flatspot!
					</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<div class="search d-flex">
						<div class="search__section search__section_category">
							<p class="search__title">
								What are you looking for?
							</p>
							<el-dropdown size="large">
								<span class="el-dropdown-link">
									{{propertyTypes[propertyTypeIndex].label}}
									<el-icon class="el-icon--right">
										<img src="@/assets/chevron-down.svg" alt="find {{propertyTypes[propertyTypeIndex].label}}">
									</el-icon>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item v-for="(propertyType, index) in propertyTypes" :key="index" @click="setPropertyTypeIndex(index);">
											{{propertyType.label}}
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
						<div class="search__section search__section_location">
							<p class="search__title">
								Where?
							</p>
							<el-dropdown size="large">
								<span class="el-dropdown-link">
									{{provinces[provinceIndex]}}
									<el-icon class="el-icon--right">
										<img src="@/assets/chevron-down.svg" alt="find flat in {{provinces[provinceIndex]}}">
									</el-icon>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item v-for="(province, index) in provinces" :key="index" @click="setProvinceIndex(index);">{{province}}
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
						<div class="search__section search__section_category2">
							<p class="search__title">
								What?
							</p>
							<el-dropdown size="large">
								<span class="el-dropdown-link">
									{{types[typeIndex].label}}
									<el-icon class="el-icon--right">
										<img src="@/assets/chevron-down.svg" alt="find {{types[typeIndex].label}}">
									</el-icon>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item v-for="(type, index) in types" :key="index" @click="setTypeIndex(index);">{{type.label}}
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
						<div class="search__section search__section_button">
							<button class="search__button" @click="refresh()">Search →</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Flat from '../store/flats';

export default {
	data() {
		return {
			titleVisible: false,
			options: {
				componentRestrictions: {
					country: 'ES'
				}
			}
		}
	},
	components: {

	},
	methods: {
		...mapActions(Flat, ["fetchFlats", "fetchMapFlats", "setProvinceIndex", "setPropertyTypeIndex", "setTypeIndex", "resetStart"]),
		refresh() {
			this.resetStart()
			this.fetchFlats()
			this.fetchMapFlats()
		}
	},
	computed: {
		...mapState(Flat, ["provinces", "provinceIndex", "propertyTypes", "propertyTypeIndex", "types", "typeIndex"]),
	}
}
</script>

<style lang="scss" scoped>
.main {
	position: relative;
	padding-bottom: 80px;

}

.main-image {
	right: 0;
	position: absolute;
	margin-left: auto;
	width: 100%;
	height: 510px;
	background-image: url("../assets/images/flatspot-flat-finder.jpg");
	background-repeat: no-repeat;
	background-position: 35%;
	background-size: cover;
	filter: brightness(70%);
	z-index: -100;
}

.main-title {
	font-size: 45px;
	max-width: 810px;
	font-weight: 600;
	color: #fff;
	margin-top: 20px;
}

.second-title {
	margin-top: 120px;
	font-size: 20px;
	color: #fff;
}

.search {
	-webkit-box-shadow: 0px 28px 71px -5px rgba(0, 0, 0, 0.1);
	-moz-box-shadow: 0px 28px 71px -5px rgba(0, 0, 0, 0.1);
	box-shadow: 0px 28px 71px -5px rgba(0, 0, 0, 0.1);
	margin: auto;
	margin-top: 170px;
	border-radius: 10px;
}

.search__section {
	background-color: #fff;
	padding: 35px 40px 20px;
	width: 100%;
}

.search__section_category {
	position: relative;
	border-radius: 10px 0 0 10px;
}

.search__section_category2,
.search__section_location {
	position: relative;
}

.search__section_category::after,
.search__section_category2::after,
.search__section_location::after {
	position: absolute;
	top: 1em;
	right: 0;
	content: "";
	bottom: 1em;
	border-right: 1px solid #d8d8d8;
}

.search__section_button {
	border-radius: 0 10px 10px 0;
}

.search__title {
	font-weight: 500;
	color: #d6d6d6;
	margin-bottom: 15px;
}

.search__select,
.search__input {
	border: none;
	font-size: 23px;
	background-color: #fff;
}

.search__input {
	max-width: 220px;
	width: 220px;
	height: 20px;
	padding: 13px 0px;
	margin: 0px;
	outline: none;
	border: 0px;
	vertical-align: baseline;
}

.search__input::placeholder,
.search__input {
	padding: 0;
	font-weight: 700;
	color: #000;
}

.search__button {
	margin-top: 17px;
	max-width: 100%;
	font-size: 18px;
	width: 100%;
	background-color: #fff;
	color: #1d56bc;
	font-weight: 700;
	text-transform: uppercase;
	border: none;
}

.search__button:hover {
	// background-color: map-get($flatspot-accent, 700);
}

.el-dropdown-link {
	display: flex;
	align-items: center;
}

@media screen and (max-width: 991px) {
	.search {
		flex-direction: column;
	}

	.search__section.search__section_category,
	.search__section.search__section_location,
	.search__section.search__section_category2 {
		text-align: center;
		border-radius: 10px;
	}

	.search__section.search__section_button {
		border-radius: 10px;
	}
}
</style>