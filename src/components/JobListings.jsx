import { JobCard } from "./JobCard.jsx";

export function JobListings ({ jobs }) {
  return (
    <>
      {
        jobs.length !== 0 
        /* 
        TODO: no debe estar aca el estilo.
        Se puede hacer en un paso posterior. No es urgente.
        */
        ? <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2> 
        : null
      }

      <div className="jobs-listings">
        {
          jobs.length === 0 
          /*
          TODO: mejorar el estilo. Esto no es opcional, pero
          se puede hacer en un paso posterior. No es urgente.
          */
          ? <p style={{ textAlign: 'center', padding: '2rem', textWrap: 'balance'}}>No se han encontrado resultados que coincidan con su búsqueda.</p> 
          : null
        }
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}