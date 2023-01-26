<script setup>
defineProps({
  options: Object,
});
</script>

<template>
  <div class="check">
    <label class="input-checkbox">
      <input
        class="input"
        type="checkbox"
        v-model="options.value"
        :disabled="options?.accessLevel?.toLowerCase() === 'admin'"
      />
      {{ options.label }}
      <span v-if="options.required" class="required"> * </span>
    </label>
  </div>
</template>
