<script setup>
import { vMaska } from "maska";
defineProps({
  options: Object,
});
</script>

<template>
  <div class="name">
    <label class="title-label">
      {{ options.label }}
      <span v-if="options.required" class="required"> * </span>
    </label>
    <input
      class="input-text"
      :type="options?.type?.toLowerCase() === 'string' ? 'text' : 'number'"
      v-model="options.value"
      :placeholder="options.title"
      :disabled="options?.accessLevel?.toLowerCase() === 'admin'"
      v-maska:[options.maskOption]
    />
  </div>
</template>
