// const botones = document.querySelectorAll(".button-apply-job");

// botones.forEach(boton => {
//     boton.addEventListener("click", () => {
//         boton.textContent = "Aplicado!";
//         boton.classList.add("is-applied");
//         boton.disabled = true;
//     });
// });

const jobListingSections = document.querySelector(".jobs-listings");

jobListingSections?.addEventListener("click", event => {
    const element = event.target;

    if (element.classList.contains("button-apply-job")) {
        element.textContent = "Aplicado!";
        element.classList.add("is-applied");
        element.disabled = true;
    }
});

// Filter jobs by location
const filter = document.querySelector("#filter-location"); //select
const mensaje =document.querySelector("#filter-selected-value"); 
const jobs = document.querySelectorAll(".job-listing-card");

filter.addEventListener("change", () => {
    const selectedValue = filter.value;
    
    //testing
    if (selectedValue) {
        mensaje.textContent = `Has seleccionado: ${selectedValue}`;
    } else {
        mensaje.textContent = "";
    }

    jobs.forEach(job => {
        //const modalidad = job.dataset.modalidad; //seria remoto en la primera fila 
        const modalidad = job.getAttribute("data-modalidad");
        const isShow = selectedValue === "" || selectedValue === modalidad;
        job.classList.toggle("is-hidden", !isShow);

        // if (selectedValue === "" || selectedValue === modalidad) {
        //     job.classList.remove("is-hidden");
        // } else {
        //     job.classList.add("is-hidden");
        // }
    });
});




// const searchInput = document.querySelector("#empleos-search-input");

// searchInput.addEventListener("input", () => {
//     console.log(searchInput.value);
// });

// const searchForm = document.querySelector("#empleos-search-form");

// searchForm.addEventListener("submit", event => {
//    event.preventDefault();
// });
