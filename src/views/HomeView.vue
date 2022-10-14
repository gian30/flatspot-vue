<template>
	<HeroComponent></HeroComponent>
	<FlatsGridComponent></FlatsGridComponent>
	<FlatsMapComponent></FlatsMapComponent>
	<FooterComponent></FooterComponent>
</template>

<script>
import HeroComponent from '@/components/HeroComponent.vue'
import FlatsGridComponent from '@/components/FlatsGridComponent.vue'
import FlatsMapComponent from '@/components/FlatsMapComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue';
export default {
	name: 'HomeView',
	components: {
    HeroComponent,
    FlatsGridComponent,
    FlatsMapComponent,
    FooterComponent
}
}
</script>
