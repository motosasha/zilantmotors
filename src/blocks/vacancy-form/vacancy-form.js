import ready from "../../js/utils/documentReady.js";
import * as FilePond from "filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

ready(function () {
  window.FilePond = FilePond;
  FilePond.registerPlugin(FilePondPluginFileValidateSize);
  FilePond.registerPlugin(FilePondPluginFileValidateType);

  window.fileFields = document.querySelectorAll("input[type='file']");
  if (window.fileFields) {
    window.fileFields.forEach((field) => {
      FilePond.create(field);
    });
  }
});
