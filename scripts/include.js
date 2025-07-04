function loadComponent(id, path) {
  fetch(path)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "components/header.html");
  loadComponent("footer-placeholder", "components/footer.html");
});
