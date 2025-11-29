// Verifica el boton aplicar y aplica los cambios
const jobListingSections = document.querySelector(".jobs-listings");

jobListingSections?.addEventListener("click", event => {
    const element = event.target;

    if (element.classList.contains("button-apply-job")) {
        element.textContent = "Aplicado!";
        element.classList.add("is-applied");
        element.disabled = true;
    }
});


// - Otro evento interesante -

// const botones = document.querySelectorAll(".button-apply-job");

// botones.forEach(boton => {
//     boton.addEventListener("click", () => {
//         boton.textContent = "Aplicado!";
//         boton.classList.add("is-applied");
//         boton.disabled = true;
//     });
// });

