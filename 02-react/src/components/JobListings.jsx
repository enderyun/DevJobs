import { JobCard } from "./JobCard.jsx";

export function JobListings ({ jobs }) {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2> {/* TODO: no debe estar aca */}

      <div className="jobs-listings">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}