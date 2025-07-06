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

// Neue Funktion zur automatischen Anzeige der Navbar auf großen Bildschirmen
function handleResize() {
    const navbar = document.getElementById("navbar");
    const burger = document.getElementById("burger");

    if (!navbar || !burger) return;

    if (window.innerWidth > 768) {
        navbar.style.display = "flex"; // Immer zeigen bei großem Bildschirm
    } else {
        navbar.style.display = "none"; // Nur über Burger bei Mobile
        burger.classList.remove('transform'); // optional: Burger zurücksetzen
    }
}

// Event Listener hinzufügen
window.addEventListener("resize", handleResize);

// Initial aufrufen beim Laden
window.addEventListener("DOMContentLoaded", handleResize);

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
