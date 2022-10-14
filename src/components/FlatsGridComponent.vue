<template>
	<div class="flats-component" id="flats">
		<div class="container">
			<div class="row">
				<div class="filter d-flex justify-content-between">
					<el-dropdown size="large">
						<span class="el-dropdown-link">
							{{filterTypes[selectedFilterIndex]}}
							<el-icon class="el-icon--right">
								<img src="@/assets/chevron-down.svg">
							</el-icon>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item v-for="(filterTypeValue, index) in filterTypes" :key="index"
									@click="selectedFilterIndex=index">{{filterTypeValue}}
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
					<div class="sortby d-flex justify-content-between align-items-center">
						<p class="sortby__title">Sort by: </p>
						<button @click="setOrderIndex(index); refresh() " class="sortby__button btn btn-transparent"
							:class="{'sortby__button-selected': index == orderIndex}" v-for="(order, index) in orders"
							:key="index">{{order.label}}</button>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="d-flex justify-content-between flex-wrap flat-grid-wrapper" v-if="!loading">
					<div v-for="(flat, index) in flats" :key="index">
						<FlatCardComponent :flat="flat"></FlatCardComponent>
					</div>
				</div>
				<div class="d-flex justify-content-center" v-if="loading">
					<LoadingSpinnerComponent></LoadingSpinnerComponent>
				</div>
				<button class="btn btn-primary load-more mt-5" @click="loadMore()" :disabled="loading">More</button>

			</div>
		</div>
	</div>
</template>
<script>

import FlatCardComponent from '@/components/FlatCardComponent.vue'
import Flat from '../store/flats';
import { mapActions, mapState } from 'pinia';
import LoadingSpinnerComponent from './elements/LoadingSpinnerComponent.vue';
export default {
	data() {
		return {
			filterTypes: ['All'],
			selectedFilterIndex: 0,
		}
	},
	computed: {
		...mapState(Flat, ['flats']),
		...mapState(Flat, ['orderIndex']),
		...mapState(Flat, ['orders']),
		...mapState(Flat, ['loading']),
	},
	methods: {
		...mapActions(Flat, ['fetchFlats']),
		...mapActions(Flat, ['fetchMapFlats']),
		...mapActions(Flat, ['nextStart']),
		...mapActions(Flat, ['resetStart']),
		...mapActions(Flat, ['setOrderIndex']),
		loadMore() {
			this.fetchFlats()
			this.nextStart()
		},
		refresh() {
			this.resetStart()
			this.fetchFlats()
			this.fetchMapFlats()
		}
	},
	components: {
    FlatCardComponent,
    LoadingSpinnerComponent
},
	created() {
		this.loadMore()
	}
}
</script>
<style lang="scss" scoped>
.filter {
	width: 100%;
}

.flats-component {
	padding-bottom: 30px;
}

.search__dropdown {
	font-weight: 700;
}

.search__dropdown:after {
	content: none;
	/*Hide arrow down*/
}

.sortby__title {
	font-weight: 700;
}

.sortby__button.btn.btn-transparent {
	color: #969696;
	font-weight: 500;
	margin-left: 20px;
	padding: 0px;
	font-size: 14px;

	&.sortby__button-selected {
		color: #1d56bc;
	}
}

.sortby__button.btn.btn-transparent.sortby__button-selected {
	color: #1d56bc;
}


.button {
	background-color: #1d56bc;
	width: 100px;
	padding: 10px;
	margin: auto;
	text-transform: uppercase;
	margin-top: 10px;
}

button.btn.load-more {
	width: 200px;
	margin: auto;
	display: block;
}

span.el-dropdown-link {
	display: flex;
}

@media (max-width: 991px) {
	.flat-grid-wrapper {
		flex-direction: column;
		.flat-card {
			width: 100%;
		}

	}
}
</style>