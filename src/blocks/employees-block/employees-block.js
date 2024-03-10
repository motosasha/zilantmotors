import ready from "../../js/utils/documentReady.js";

ready(function () {
  const tabs = document.querySelectorAll(".employees-block__tab");

  if (tabs) {
    const panes = document.querySelectorAll(".employees-block__pane");

    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const currentTab = e.target;
        const target = currentTab.dataset.tab;

        tabs.forEach((item) => {
          item.classList.remove("employees-block__tab--active");
        });
        currentTab.classList.add("employees-block__tab--active");

        panes.forEach((pane) => {
          pane.classList.remove("employees-block__pane--active");
          if (pane.id === target) {
            pane.classList.add("employees-block__pane--active");
          }
        });
      });
    });
  }
});
