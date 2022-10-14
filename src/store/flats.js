import { defineStore } from 'pinia';

import { supabase } from '../supabase';

export default defineStore('flat', {
	state: () => ({
		flats: [],
		mapFlats: [],
		start: 0,
		limit: 20,
		loading: false,
		moreLoading: false,
		mapLoading: false,
		orders: [
			{ label: 'Price', query: 'price', ascending: true },
			{ label: 'Area', query: 'area', ascending: false },
			{ label: 'Rooms', query: 'rooms', ascending: false }
		],
		orderIndex: 0,
		provinces: [ 'Barcelona', 'Madrid', 'Valencia' ],
		provinceIndex: 0,
		propertyTypes: [
			{ label: 'Flat', query: 'flat' },
			{ label: 'House', query: 'house' },
			{ label: 'Loft', query: 'loft' }
		],
		propertyTypeIndex: 0,
		types: [ { label: 'Sale', query: 'buy' }, { label: 'Rent', query: 'rent' } ],
		typeIndex: 0
	}),
	actions: {
		async fetchFlats() {
			this.activateLoading();
			const { data: flats } = await supabase
				.from('flat')
				.select('*')
				.range(this.start, this.start + this.limit)
				.order(this.orders[this.orderIndex].query, { ascending: this.orders[this.orderIndex].ascending })
				.neq('price', 0)
				.ilike('province', `%${this.provinces[this.provinceIndex]}%`)
				.ilike('propertyType', `%${this.propertyTypes[this.propertyTypeIndex].query}%`)
				.ilike('type', `%${this.types[this.typeIndex].query}%`);
			console.log(this.start);
			if (this.start === 0) {
				this.flats = flats;
			} else {
				this.flats = [ ...this.flats, ...flats ];
			}
			this.deactivateLoading();
		},
		async fetchMapFlats() {
			this.activateMapLoading();
			const { data: flats } = await supabase
				.from('flat')
				.select('*')
				.range(0, 300)
				.neq('price', 0)
				.ilike('province', `%${this.provinces[this.provinceIndex]}%`)
				.ilike('propertyType', `%${this.propertyTypes[this.propertyTypeIndex].query}%`)
				.ilike('type', `%${this.types[this.typeIndex].query}%`);
			this.mapFlats = flats;
			this.deactivateMapLoading();
		},
		async searchFlats(search) {
			this.activateLoading();
			this.activateMapLoading();
			this.flats = [];
			const { data: flats } = await supabase
				.rpc('search_flats', {
					keyword: search
				})
				.neq('price', 0)
				.range(this.start, this.start + this.limit)
				.order(this.orders[this.orderIndex].query, { ascending: this.orders[this.orderIndex].ascending });

			this.flats = flats;
			this.mapFlats = flats;
			this.deactivateLoading();
			this.deactivateMapLoading();
		},
		nextStart() {
			this.start = this.start + this.limit;
		},
		resetStart() {
			this.flats = [];
			this.start = 0;
		},
		setLimit(limit) {
			this.limit = limit;
		},
		setOrderIndex(index) {
			this.orderIndex = index;
		},
		setProvinceIndex(index) {
			this.provinceIndex = index;
		},
		setTypeIndex(index) {
			this.typeIndex = index;
		},
		setPropertyTypeIndex(index) {
			this.propertyTypeIndex = index;
		},
		activateLoading() {
			this.loading = true;
		},
		deactivateLoading() {
			this.loading = false;
		},
		activateMapLoading() {
			this.mapLoading = true;
		},
		deactivateMapLoading() {
			this.mapLoading = false;
		},
		activateMoreLoading() {
			this.moreLoading = true;
		},
		deactivateMoreLoading() {
			this.moreLoading = false;
		}
	}
});
