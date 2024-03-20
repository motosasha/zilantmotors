import ready from "../../js/utils/documentReady.js";
import * as FilePond from "filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import JustValidate from "just-validate";
import { vacancyFormAddress, vacancyFormConfig } from "../../js/variables.js";

const ruDict = [
  {
    key: "Value is incorrect",
    dict: {
      ru: "Неверное значение",
    },
  },
  {
    key: "Value is required",
    dict: {
      ru: "Обязательное поле",
    },
  },
  {
    key: "Value is too short",
    dict: {
      ru: "Значение слишком короткое",
    },
  },
  {
    key: "Value is too long",
    dict: {
      ru: "Значение слишком длинное",
    },
  },
];

ready(function () {
  const vacancyForm = document.querySelector("#vacancyForm");

  if (vacancyForm) {
    const inputElement = document.querySelector('input[type="file"]');

    FilePond.registerPlugin(FilePondPluginFileValidateSize);
    FilePond.registerPlugin(FilePondPluginFileValidateType);

    const fileInput = FilePond.create(inputElement, {
      labelIdle: "<span>Выберите файл</span> или перетащите<br>Формат — DOC, PDF. До 5 Мбайт",
      maxFileSize: "5MB",
      acceptedFileTypes: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });

    const vacancyFormValidate = new JustValidate("#vacancyForm", undefined, ruDict);

    vacancyFormValidate.setCurrentLocale("ru");
    vacancyFormValidate
      .addField("#vacancyName", [
        {
          rule: "required",
          errorMessage: "Value is required",
        },
        {
          rule: "minLength",
          value: 3,
          errorMessage: "Value is too short",
        },
        {
          rule: "maxLength",
          value: 50,
          errorMessage: "Value is too long",
        },
      ])
      .addField("#vacancyLastName", [
        {
          rule: "required",
          errorMessage: "Value is required",
        },
        {
          rule: "minLength",
          value: 3,
          errorMessage: "Value is too short",
        },
        {
          rule: "maxLength",
          value: 50,
          errorMessage: "Value is too long",
        },
      ])
      .addField("#vacancyEmail", [
        {
          rule: "required",
          errorMessage: "Value is required",
        },
        {
          rule: "email",
          errorMessage: "Value is incorrect",
        },
      ])
      .addField("#vacancyPhone", [
        {
          rule: "required",
          errorMessage: "Value is required",
        },
        {
          rule: "customRegexp",
          value: /^(\+7)[\s-]([0-9]{3})[\s-][0-9]{3}-[0-9]{2}-[0-9]{2}/gi,
          errorMessage: "Value is incorrect",
        },
      ])
      .addField("#vacancyCheck", [
        {
          rule: "required",
          errorMessage: "Value is required",
        },
      ])
      .onSuccess(() => {
        const formData = new FormData(vacancyForm);
        const pondFiles = fileInput.getFiles();
        for (let i = 0; i < pondFiles.length; i++) {
          formData.append("vacancyFile", pondFiles[i].file);
        }
        const plainFormData = Object.fromEntries(formData.entries());
        fetch(vacancyFormAddress, vacancyFormConfig(plainFormData)).then((response) => {
          if (response.ok) {
            alert("success");
          } else {
            alert("error");
          }
        });
      });
  }
});
