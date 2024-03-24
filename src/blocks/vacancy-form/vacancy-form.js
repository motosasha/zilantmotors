import ready from "../../js/utils/documentReady.js";
import * as FilePond from "filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

ready(function () {
  const vacancyForm = document.querySelector("#vacancyForm");

  if (vacancyForm) {
    const inputElement = document.querySelector('input[type="file"]');

    window.FilePond = FilePond;

    FilePond.registerPlugin(FilePondPluginFileValidateSize);
    FilePond.registerPlugin(FilePondPluginFileValidateType);

    window.fileInput = FilePond.create(inputElement);
  }
});
