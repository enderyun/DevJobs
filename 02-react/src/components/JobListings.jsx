import { JobCard } from "./JobCard.jsx";
import jobsData from "../data.json";

export function JobListings () {
  return (
    <>
      <h2>Resultados de búsqueda</h2>

      <div className="jobs-listings">
        {jobsData.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}