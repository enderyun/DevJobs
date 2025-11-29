// TODO: corregir los bugs que tengan los filtros 
// Filtro de empleos
const filterLocation = document.querySelector("#filter-location"); // <select id="filter-location">
const filterExperience = document.querySelector("#filter-experience-level"); 
const filterInput = document.querySelector("#empleos-search-input");
const filterTechnology = document.querySelector("#filter-technology");
const mensaje = document.querySelector("#filter-selected-value");


function filterJobs() {
    const jobs = document.querySelectorAll(".job-listing-card"); // Each article
    const locationValue = filterLocation.value;
    const experienceValue = filterExperience.value;
    const technologyValue = filterTechnology.value;
    const inputValue = filterInput.value;

    // Debug
    const activeFilters = [];
    if (locationValue) activeFilters.push(`Ubicación: ${locationValue}`);
    if (experienceValue) activeFilters.push(`Experiencia: ${experienceValue}`);
    if (technologyValue) activeFilters.push(`Tecnología: ${technologyValue}`);
    
    if (activeFilters.length > 0) {
        mensaje.textContent = `${activeFilters.join(", ")}`;
    } else {
        mensaje.textContent = "";
    }

    jobs.forEach(job => {
        const modalidad = job.getAttribute("data-modalidad");
        const nivel = job.getAttribute("data-nivel");
        const tecnologia = job.getAttribute("data-technology");

        // Aqui se evalua si existe
        const matchLocation = locationValue === "" || locationValue === modalidad;
        const matchExperience = experienceValue === "" || experienceValue === nivel;
        const matchTechnology = technologyValue === "" || technologyValue === tecnologia;
        const matchInput = job.textContent.toLowerCase().includes(inputValue.toLowerCase());

        // Debug
        if (matchLocation && matchExperience && matchTechnology && matchInput) {
            job.classList.remove("is-hidden");
        } else {
            job.classList.add("is-hidden");
        } 
    });
}

// Event listeners
filterLocation?.addEventListener("change", filterJobs);
filterExperience?.addEventListener("change", filterJobs);
filterInput?.addEventListener("input", filterJobs);
filterTechnology?.addEventListener("change", filterJobs);


