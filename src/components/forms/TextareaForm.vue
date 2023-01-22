<script setup>
defineProps({
  options: Object,
});
</script>

<template>
  <div class="input-box">
    <label class="title-label">
      {{ options.label }}
      <span v-if="options.required" class="required"> * </span>
    </label>
    <textarea class="input-text"></textarea>
  </div>
</template>
