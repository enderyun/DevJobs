import { useState } from "react";

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { Pagination } from "../components/Pagination.jsx";

import jobsData from "../data.json"; // TODO: arreglar el json, ya que mezcla español con inglés

const RESULTS_PER_PAGE = 4; // Cambiar si es necesario

export function SearchPage() {  // Usado en el SearchFormSection

  const [ filters, setFilters ] = useState({ 
    technology: "",
    location: "",
    experienceLevel: ""
  })
  const [ textToFilter, setTextToFilter ] = useState(""); // Typo en tiempo real
  const [ currentPage, setCurrentPage ] = useState(1); 

  // Option values del SearchFormSection
  const jobFilteredByFilters = jobsData.filter(job => {
    return (
      (filters.technology === "" || job.data.technology === filters.technology) &&
      (filters.location === "" || job.data.modalidad === filters.location) &&
      (filters.experienceLevel === "" || job.data.nivel === filters.experienceLevel)
    )
  })
  
  // Typo en tiempo real
  const jobsWithTextFilter = textToFilter === ""
    ? jobFilteredByFilters 
    : jobFilteredByFilters.filter(job => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    })

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE); 

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, // 1 -> 0, 2 -> 4, 3 -> 8...
    currentPage * RESULTS_PER_PAGE // 4, 8, 12...
  )

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Filtros de technology, location o experienceLevel del SearchFormSection
  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  }

  // Input text del SearchFormSection
  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  }

  return (
    <main>
      <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>

      <section>
        <JobListings jobs={pagedResults} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
      </section>
    </main>
  );
}