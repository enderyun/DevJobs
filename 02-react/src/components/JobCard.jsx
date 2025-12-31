// Componente JobCard - Recibe los datos de un trabajo como prop
import { useState } from "react";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  function handleApplyClick() {
    setIsApplied(!isApplied);
  }

  const buttonText = isApplied ? "Aplicado" : "Aplicar";
  const buttonClass = isApplied ? "button-apply-job is-applied" : "button-apply-job";

  return (
    <>
      <article
        className="job-listing-card"
        data-modalidad={job.data?.modalidad}
        data-nivel={job.data?.nivel}
        data-technology={job.data?.technology}
      >
        <div>
          <h3>{job.titulo}</h3>
          <small>
            {job.empresa} | {job.ubicacion}
          </small>
          <p>{job.descripcion}</p>
        </div>
        <button
          className={buttonClass}
          onClick={handleApplyClick}
        >
          {buttonText}
        </button>
      </article>
    </>
  );
}
