import ready from "../../js/utils/documentReady.js";
import * as FilePond from "filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import JustValidate from "just-validate";

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
  window.FilePond = FilePond;
  FilePond.registerPlugin(FilePondPluginFileValidateSize);
  FilePond.registerPlugin(FilePondPluginFileValidateType);

  const vacancyForm = document.querySelector("#vacancyForm");
  if (vacancyForm) {
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
      ]);
  }
});
