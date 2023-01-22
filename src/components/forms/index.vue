<script setup>
import InputForm from "./InputForm.vue";
import TextareaForm from "./TextareaForm.vue";
import SelectForm from "./SelectForm.vue";
import RadioForm from "./RadioForm.vue";
import Checkbox from "./CheckboxForm.vue";
import DateForm from "./DateForm.vue";

defineProps({
  options: Object,
});
</script>

<template>
  <div>
    <div>
      <InputForm
        v-if="
          options?.type?.toLowerCase() === 'string' ||
          options?.type?.toLowerCase() === 'number'
        "
        :options="options"
      />
      <TextareaForm
        v-if="options?.type?.toLowerCase() === 'textarea'"
        :options="options"
      />
      <SelectForm
        v-if="options?.type?.toLowerCase() === 'list'"
        :options="options"
      />
      <RadioForm
        v-if="options?.type?.toLowerCase() === 'radio'"
        :options="options"
      />
      <Checkbox
        v-if="options?.type?.toLowerCase() === 'checkbox'"
        :options="options"
      />
      <DateForm
        v-if="
          options?.type?.toLowerCase() === 'date' ||
          options?.type?.toLowerCase() === 'range'
        "
        :options="options"
      />
    </div>
  </div>
</template>
