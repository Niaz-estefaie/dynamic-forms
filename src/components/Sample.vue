<script setup>
import Modal from "./materials/Modal.vue";
import Forms from "./forms/index.vue";
import { ref } from "vue";

const maskOptions = ref({
  title: "",
  type: "string",
  value: "",
  required: false,
  maskOption: {
    mask: "",
    eager: true,
  },
});
const formsList = ref([]);
const modalOptions = ref({
  title: {
    title: "title",
    label: "Title",
    type: "string",
    required: true,
    value: "",
  },
  label: {
    title: "label",
    label: "Label",
    type: "string",
    required: true,
    value: "",
  },
  type: {
    title: "type",
    label: "Type",
    type: "list",
    required: true,
    value: "String",
    list: [
      "Number",
      "String",
      "Textarea",
      "Date",
      "Range",
      "List",
      "Radio",
      "Checkbox",
    ],
  },
  description: {
    title: "description",
    label: "Description",
    type: "textarea",
    required: false,
    value: "",
  },
  required: {
    title: "required",
    label: "Required",
    type: "checkbox",
    required: false,
    value: "",
  },
  accessLevel: {
    title: "accessLevel",
    label: "Access level",
    type: "list",
    required: false,
    value: "None",
    list: ["Admin", "User", "None"],
  },
  list: [
    {
      title: "",
      type: "string",
    },
  ],
});
const show = ref(false);
const showRequiredText = ref(false);
const isEditing = ref(false);
const editIndex = ref();

const checkIfEmpty = (object) => {
  return !object.value ? false : true;
};

const { title, label, type, description, accessLevel, required, list } =
  modalOptions.value;

const addForm = () => {
  title.value = "";
  label.value = "";
  type.value = "String";
  description.value = "";
  accessLevel.value = "none";
  required.value = "";
  maskOptions.value.value = "";

  show.value = true;
};

const addNewForm = () => {
  if (checkIfEmpty(title) && checkIfEmpty(label) && checkIfEmpty(type)) {
    showRequiredText.value = false;

    formsList.value = [
      ...formsList.value,
      {
        title: title.value,
        label: label.value,
        type: type.value,
        description: description.value,
        accessLevel: accessLevel.value,
        required: required.value,
        list: list ? list : null,
        maskOption: {
          mask: maskOptions.value.value,
          eager: true,
        },
      },
    ];

    show.value = false;
  } else {
    showRequiredText.value = true;
  }
};

const addNewList = (e) => {
  e.preventDefault();
  const { list } = modalOptions.value;
  list.push({
    title: "",
    type: "string",
  });
};

const deleteForm = (index) => {
  formsList.value.splice(index, 1);
};

const editForm = (item, index) => {
  show.value = true;
  isEditing.value = true;
  editIndex.value = index;
  const { title, label, type, description, accessLevel, required, list } =
    modalOptions.value;

  title.value = item.title;
  label.value = item.label;
  type.value = item.type;
  description.value = item.description;
  accessLevel.value = item.accessLevel;
  accessLevel.value = item.accessLevel;
  required.value = item.required;
  list.value = item.list;
};

const editMainFrom = () => {
  formsList.value[editIndex.value] = {
    title: title.value,
    label: label.value,
    type: type.value,
    description: description.value,
    accessLevel: accessLevel.value,
    required: required.value,
    list: list.value,
    maskOption: {
      mask: maskOptions.value.value,
      eager: true,
    },
  };
  show.value = false;
  isEditing.value = false;
};
</script>

<template>
  <div class="main-container">
    <button @click="addForm" class="success-button">Add</button>
    <Modal :show="show">
      <template #header> Add new input </template>
      <template #body>
        <form action="submit">
          <Forms :options="modalOptions.title" />
          <Forms :options="modalOptions.label" />
          <Forms :options="modalOptions.type" />
          <div
            v-if="
              modalOptions.type?.value?.toLowerCase() === 'string' ||
              modalOptions.type?.value?.toLowerCase() === 'number'
            "
          >
            <label class="title-label">
              Mask Options
              <span> * </span>
            </label>
          </div>
          <div
            v-if="
              modalOptions.type?.value?.toLowerCase() === 'string' ||
              modalOptions.type?.value?.toLowerCase() === 'number'
            "
          >
            <div>
              use the mask option using this examples
              <pre>
{
  '#': { pattern: /[0-9]/ },       // digits
  '@': { pattern: /[a-zA-Z]/ },    // letters
  '*': { pattern: /[a-zA-Z0-9]/ }, // letters & digits
}
            </pre
              >
            </div>
            <Forms :options="maskOptions" class="form-repeater" />
          </div>
          <div
            v-if="
              modalOptions.type?.value?.toLowerCase() === 'radio' ||
              modalOptions.type?.value?.toLowerCase() === 'list'
            "
          >
            <label class="title-label">
              Radio title
              <span> * </span>
            </label>
          </div>
          <template v-for="(option, index) in modalOptions.list" :key="index">
            <div
              class="flex-box"
              v-if="
                modalOptions.type?.value?.toLowerCase() === 'radio' ||
                modalOptions.type?.value?.toLowerCase() === 'list'
              "
            >
              <Forms :options="option" class="form-repeater" />
              <button
                v-if="index === modalOptions.list.length - 1"
                @click="addNewList"
                class="success-button"
              >
                Add
              </button>
            </div>
          </template>
          <Forms :options="modalOptions.description" />
          <Forms :options="modalOptions.accessLevel" />
          <Forms :options="modalOptions.required" />
        </form>
      </template>
      <template #footer>
        <button @click="show = false" class="base-button">Close</button>
        <button v-if="isEditing" @click="editMainFrom()" class="success-button">
          Edit
        </button>
        <button v-else @click="addNewForm" class="success-button">Save</button>
        <h6 v-if="showRequiredText">Please fill the required inputs</h6>
      </template>
    </Modal>
    <Draggable v-model="formsList">
      <transition-group>
        <div
          class="inner-container"
          v-for="(option, index) in formsList"
          :key="index"
        >
          <Forms :options="option" />
          <button
            v-if="option?.accessLevel?.toLowerCase() !== 'admin'"
            @click="editForm(option, index)"
            class="success-button"
          >
            Edit
          </button>
          <button
            v-if="option?.accessLevel?.toLowerCase() !== 'admin'"
            @click="deleteForm(index)"
            class="base-button"
          >
            Delete
          </button>
        </div>
      </transition-group>
    </Draggable>
  </div>
</template>

<style scoped>
.main-container {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  padding: 20px;
  margin: auto;
  background: #fffbfb;
}
.inner-container {
  display: flex;
  align-items: center;
}
</style>
