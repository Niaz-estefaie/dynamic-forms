<script setup>
defineProps({
  options: Object,
});
</script>

<template>
  <div class="radio">
    <h4>{{ options.label }}</h4>
    <label
      class="title-label"
      v-for="(item, index) in options.list"
      :key="index"
    >
      <template v-if="item.value">
        <input
          class="input"
          type="radio"
          v-model="options.value"
          :disabled="options?.accessLevel?.toLowerCase() === 'admin'"
          :value="item"
        />
        {{ item.value ? item.value : item }}
        <span v-if="options.required" class="required"> * </span>
      </template>
    </label>
  </div>
</template>
