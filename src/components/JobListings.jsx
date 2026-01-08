import { JobCard } from "./JobCard.jsx";

export function JobListings ({ jobs }) {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2> {/* TODO: no debe estar aca */}

      <div className="jobs-listings">
        {
          jobs.length === 0 
          // TODO: mejorar el estilo co
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