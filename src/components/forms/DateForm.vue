<script setup>
import { ref, onMounted } from "vue";
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
    <Datepicker
      :range="options?.type?.toLowerCase() === 'range'"
      v-model="options.value"
      :disabled="options?.accessLevel?.toLowerCase() === 'admin'"
    />
  </div>
</template>
