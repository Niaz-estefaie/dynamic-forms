<script setup>
defineProps({
  options: Object,
});
</script>

<template>
  <div class="dropdown">
    <label class="title-label">
      {{ options.label }}
      <span v-if="options.required" class="required"> * </span>
    </label>
    <div class="input-box">
      <select
        v-model="options.value"
        :disabled="options?.accessLevel?.toLowerCase() === 'admin'"
      >
        <option
          v-for="(item, index) in options.list"
          :value="item"
          :key="index"
        >
          {{ item.value ? item.value : item }}
        </option>
      </select>
    </div>
  </div>
</template>
