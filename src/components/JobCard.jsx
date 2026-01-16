// Componente JobCard - Recibe los datos de un trabajo como prop
import { useState } from "react";
import { Link } from "./Link.jsx";
import styles from "./JobCard.module.css";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  function handleApplyClick() {
    setIsApplied(!isApplied);
  }

  const buttonText = isApplied ? "Aplicado" : "Aplicar";
  const buttonClass = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";

  return (
    <>
      <article
        className="job-listing-card"
        data-modalidad={job.data?.modalidad}
        data-nivel={job.data?.nivel}
        data-technology={job.data?.technology}
      >
        <div>
          <Link to={`/jobs/${job.id}`} className={styles.title}>
            <h3>{job.titulo}</h3>
          </Link>
          <small>
            {job.empresa} | {job.ubicacion}
          </small>
          <p>{job.descripcion}</p>
        </div>
        <div className={styles.actions}>
          <Link to={`/jobs/${job.id}`} className={styles.details}>
            Ver Detalles
          </Link>
          <button className={buttonClass} onClick={handleApplyClick}>
            {buttonText}
          </button>
        </div>
      </article>
    </>
  );
}
