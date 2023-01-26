import { reactive } from "vue";

export function formTemplate() {
  const formValue = reactive({
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

  return formValue;
}
