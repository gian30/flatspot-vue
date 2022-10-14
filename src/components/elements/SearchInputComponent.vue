<template>
	<div class="input-group">
		<label v-if="label">{{ label }}</label>
		<input type="text" class="form-control shadow-none" :value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" aria-label="Search flat"
			aria-describedby="basic-addon2" placeholder='Try "Barcelona"'>
		<div class="input-group-append">
			<button class="btn" type="button"><img src="@/assets/search.svg" alt="Search" class="search-icon"></button>
		</div>
	</div>
</template>
  
<script setup>
defineProps({
	label: {
		type: [String, Boolean],
		default: false,
	},
	modelValue: {
		type: String,
		default: "",
	},
	width: {
		type: String,
		default: "100%",
	}
});
</script>
  
<style lang="scss" scoped>
.input-group {
	width: v-bind(width);
}



@media (max-width: 768px) {
	.input-group {
		width: 100%;
	}
}
</style>