<script setup>
import Modal from "./materials/Modal.vue";
import Forms from "./forms/index.vue";
import { ref } from "vue";
import { formTemplate } from "../composables/FormTemplate.js";

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

let formsList = ref(JSON.parse(localStorage.getItem("formsList")) || []);
const show = ref(false);
const showRequiredText = ref(false);
const isEditing = ref(false);
const editIndex = ref();
let formData = formTemplate();

const updateLocalStorage = () => {
  localStorage.setItem("formsList", JSON.stringify(formsList.value));
};

const checkIfEmpty = (object) => {
  return !object.value ? false : true;
};

const addForm = () => {
  formData = formTemplate();
  show.value = true;
};

const addNewForm = () => {
  if (
    checkIfEmpty(formData.title) &&
    checkIfEmpty(formData.label) &&
    checkIfEmpty(formData.type)
  ) {
    showRequiredText.value = false;

    formsList.value = [
      ...formsList.value,
      {
        title: formData.title.value,
        label: formData.label.value,
        type: formData.type.value,
        description: formData.description.value,
        accessLevel: formData.accessLevel.value,
        required: formData.required.value,
        list: formData.list ? formData.list : null,
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
  const { list } = formData;
  list.push({
    title: "",
    type: "string",
  });
};

const deleteForm = (index) => {
  formsList.value.splice(index, 1);
  updateLocalStorage();
};

const editForm = (item, index) => {
  show.value = true;
  isEditing.value = true;
  editIndex.value = index;

  formData.title.value = item.title;
  formData.label.value = item.label;
  formData.type.value = item.type;
  formData.description.value = item.description;
  formData.accessLevel.value = item.accessLevel;
  formData.accessLevel.value = item.accessLevel;
  formData.required.value = item.required;
  formData.list = item.list;
};

const editMainFrom = () => {
  formsList.value[editIndex.value] = {
    title: formData.title.value,
    label: formData.label.value,
    type: formData.type.value,
    description: formData.description.value,
    accessLevel: formData.accessLevel.value,
    required: formData.required.value,
    list: formData.list,
    maskOption: {
      mask: maskOptions.value.value,
      eager: true,
    },
  };
  updateLocalStorage();
  show.value = false;
  isEditing.value = false;
};

const sortList = () => {
  updateLocalStorage();
};
</script>

<template>
  <div class="flex-box">
    <div class="main-container">
      <button @click="addForm" class="success-button">Add New Form</button>
      <h4 class="mb-4">
        Your role is <i><b>user</b></i> and you cannot access the role admin
      </h4>
      <h6 class="mt-4">Forms with admin roles will be disabled for you</h6>
      <Modal :show="show">
        <template #header> Add new input </template>
        <template #body>
          <form action="submit">
            <Forms :options="formData?.title" />
            <Forms :options="formData?.label" />
            <Forms :options="formData?.type" />
            <div
              v-if="
                formData?.type?.value?.toLowerCase() === 'string' ||
                formData?.type?.value?.toLowerCase() === 'number'
              "
            >
              <label class="title-label">
                Mask Options
                <span> * </span>
              </label>
            </div>
            <div
              v-if="
                formData?.type?.value?.toLowerCase() === 'string' ||
                formData?.type?.value?.toLowerCase() === 'number'
              "
            >
              <Forms :options="maskOptions" class="form-repeater" />
            </div>
            <div
              v-if="
                formData?.type?.value?.toLowerCase() === 'radio' ||
                formData?.type?.value?.toLowerCase() === 'list'
              "
            >
              <label class="title-label">
                Radio title
                <span> * </span>
              </label>
            </div>
            <template v-for="(option, index) in formData?.list" :key="index">
              <div
                class="flex-box"
                v-if="
                  formData?.type?.value?.toLowerCase() === 'radio' ||
                  formData?.type?.value?.toLowerCase() === 'list'
                "
              >
                <Forms :options="option" class="form-repeater" />
                <button
                  v-if="index === formData?.list.length - 1"
                  @click="addNewList"
                  class="success-button mx-10"
                >
                  Add
                </button>
              </div>
            </template>
            <Forms :options="formData?.description" />
            <Forms :options="formData?.accessLevel" />
            <Forms :options="formData?.required" />
          </form>
        </template>
        <template #footer>
          <button @click="show = false" class="delete-button">Close</button>
          <button
            v-if="isEditing"
            @click="editMainFrom()"
            class="success-button mx-10"
          >
            Edit
          </button>
          <button v-else @click="addNewForm" class="success-button mx-10">
            Save
          </button>
          <h6 v-if="showRequiredText">Please fill the required inputs</h6>
        </template>
      </Modal>
      <Draggable v-model="formsList" @change="sortList">
        <transition-group>
          <div
            class="inner-container"
            v-for="(option, index) in formsList"
            :key="index"
          >
            <Forms :options="option" class="flex-grow" />
            <div class="button-group">
              <button
                v-if="option?.accessLevel?.toLowerCase() !== 'admin'"
                @click="editForm(option, index)"
                class="success-button mx-10"
              >
                Edit
              </button>
              <button
                v-if="option?.accessLevel?.toLowerCase() !== 'admin'"
                @click="deleteForm(index)"
                class="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        </transition-group>
      </Draggable>
      <button
        @click="updateLocalStorage"
        class="success-button w-full font-lg my-10"
      >
        Save
      </button>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 8px;
  padding: 20px;
  margin: 40px auto;
  background: #26273b;
}
.inner-container {
  margin: 10px 0;
}
@media only screen and (min-width: 401px) {
  .inner-container {
    display: flex;
    align-items: end;
  }
}
@media only screen and (max-width: 400px) {
  .inner-container {
    display: block;
  }
  .button-group {
    margin: 10px 0;
  }
}
.title-label {
  padding: 10px 0 0 0;
}
.form-repeater {
  margin: 0 0 10px 0;
}
</style>
