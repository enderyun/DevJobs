//Fetch API to get jobs
const jobsContainer = document.querySelector(".jobs-listings");
if (jobsContainer) {
    fetch("./data.json") 
    .then(response => response.json()) 
    .then(jobs => {
        jobs.forEach(job => {
            const article = document.createElement("article");
            article.className = "job-listing-card";

            article.setAttribute("data-modalidad", job.data.modalidad); //<article data-modalidad="remoto">
            article.setAttribute("data-nivel", job.data.nivel);
            article.setAttribute("data-technology", job.data.technology);

            article.innerHTML = `
            <div>
              <h3>${job.titulo}</h3>
              <small>${job.empresa} | ${job.ubicacion}</small>
              <p>
                ${job.descripcion}
              </p>
            </div>
            <button class="button-apply-job" id="boton-importante">
              Aplicar
            </button>`;

            jobsContainer.appendChild(article);
        });
        
    });
  }



// const searchInput = document.querySelector("#empleos-search-input");

// searchInput.addEventListener("input", () => {
//     console.log(searchInput.value);
// });

// const searchForm = document.querySelector("#empleos-search-form");

// searchForm.addEventListener("submit", event => {
//    event.preventDefault();
// });
