function loadComponent(id, path, callback) {
    fetch(path)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); // Callback nach dem Einfügen
        });
}

function toggleDNone() {
    const navbar = document.getElementById("navbar");
    const burger = document.getElementById("burger");

    if (!navbar || !burger) return;

    burger.classList.toggle('transform');

    if (navbar.style.display === "flex") {
        navbar.style.display = "none";
    } else {
        navbar.style.display = "flex";
    }
}

// Beim Laden DOM + Header/Footer einfügen
window.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "components/header.html", () => {
        // Füge hier den Klicklistener NACHDEM der Header geladen wurde hinzu
        const burger = document.getElementById("burger");
        if (burger) {
            burger.addEventListener("click", toggleDNone);
        }
    });

    loadComponent("footer-placeholder", "components/footer.html");
});
