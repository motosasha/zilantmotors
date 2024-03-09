import ready from "../../js/utils/documentReady.js";
import HystModal from "../../js/vendor/hystmodal.esm.js";
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
  const modals = new HystModal({
    linkAttributeName: "data-hystmodal",
    catchFocus: true,
    closeOnEsc: true,
  });

  window.thanks = function () {
    modals.open("#thanks");
  };

  const askForPriceFormValidate = new JustValidate("#askForPriceForm", undefined, ruDict);
  const leasingCalcFormValidate = new JustValidate("#leasingCalcForm", undefined, ruDict);

  askForPriceFormValidate.setCurrentLocale("ru");
  askForPriceFormValidate
    .addField("#afpName", [
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
    .addField("#afpEmail", [
      {
        rule: "required",
        errorMessage: "Value is required",
      },
      {
        rule: "email",
        errorMessage: "Value is incorrect",
      },
    ])
    .addField("#afpPhone", [
      {
        rule: "required",
        errorMessage: "Value is required",
      },
      {
        rule: "customRegexp",
        value: /^(\+7)[\s-]([0-9]{3})[\s-][0-9]{3}-[0-9]{2}-[0-9]{2}/gi,
        errorMessage: "Value is incorrect",
      },
    ]);

  leasingCalcFormValidate.setCurrentLocale("ru");
  leasingCalcFormValidate.addField("#lcInn", [
    {
      rule: "required",
      errorMessage: "Value is required",
    },
    {
      rule: "customRegexp",
      value: /^(([0-9]{12})|([0-9]{10}))?$/gi,
      errorMessage: "Value is incorrect",
    },
  ]);
});
