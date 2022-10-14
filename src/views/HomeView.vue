<template>
	<HeroComponent></HeroComponent>
	<FlatsGridComponent></FlatsGridComponent>
	<FlatsMapComponent></FlatsMapComponent>
</template>

<script>
import HeroComponent from '@/components/HeroComponent.vue'
import FlatsGridComponent from '@/components/FlatsGridComponent.vue'
import FlatsMapComponent from '@/components/FlatsMapComponent.vue'
export default {
	name: 'HomeView',
	components: {
		HeroComponent,
		FlatsGridComponent,
		FlatsMapComponent
	}
}
</script>
