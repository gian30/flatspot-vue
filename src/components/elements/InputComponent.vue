<template>
	<div class="input-group">
		<label v-if="label">{{ label }}</label>
		<input type="text" class="form-control shadow-none" :value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" aria-label="Recipient's username"
			aria-describedby="basic-addon2">
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
});
</script>
  
<style lang="scss" scoped>

</style>