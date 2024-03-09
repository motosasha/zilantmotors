import ready from "../../js/utils/documentReady";
import IMask from "imask";

ready(function () {
  const inputs = document.querySelectorAll(".input");

  if (inputs.length !== 0) {
    for (let input of inputs) {
      if (input.value.length !== 0) input.classList.add("input--has-value");

      input.addEventListener("input", function () {
        this.value.length !== 0
          ? this.classList.add("input--has-value")
          : this.classList.remove("input--has-value");
      });
    }
  }

  const phoneFields = document.querySelectorAll("input[type=tel]");
  if (phoneFields) {
    phoneFields.forEach((field) => {
      IMask(field, {
        lazy: false,
        mask: "+{7} 000 000-00-00",
      });
    });
  }

  const innField = document.querySelector("#lcInn");
  if (innField) {
    IMask(innField, {
      mask: /^(([0-9]{0,12})|([0-9]{0,10}))?$/,
    });
  }
});
