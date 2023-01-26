<script setup>
defineProps({
  options: Object,
});
</script>

<template>
  <div class="message">
    <label class="title-label">
      {{ options.label }}
      <span
        v-if="options.required"
        :placeholder="options.title"
        class="required"
      >
        *
      </span>
    </label>
    <textarea class="input-text"></textarea>
  </div>
</template>
