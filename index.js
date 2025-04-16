document.addEventListener("DOMContentLoaded", function() {
    const medicineCard = document.getElementById("medicineCard");
    const labCard = document.getElementById("labCard");

    medicineCard.addEventListener("click", function() {
        window.location.href = "/src/medicine.html"; 
    });

    labCard.addEventListener("click", function() {
        window.location.href = "/src/lab.html"; 
    });
});