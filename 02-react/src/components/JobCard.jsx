// Componente JobCard - Recibe los datos de un trabajo como prop
import { useState } from "react";

function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  console.log("render");

  function handleClick() {
    setIsApplied(!isApplied);
  }

  const text = isApplied ? "Aplicado" : "Aplicar";
  const buttonClass = isApplied ? "is-applied" : "";

  return (
    <article
      className="job-listing-card"
      data-modalidad={job?.data?.modalidad}
      data-nivel={job?.data?.nivel}
      data-technology={job?.data?.technology}
    >
      <div>
        <h3>{job.titulo}</h3>
        <small>
          {job.empresa} - {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>
      <button
        className={`button-apply-job ${buttonClass}`}
        onClick={handleClick}
      >
        {text}
      </button>
    </article>
  );
}

export default JobCard;
