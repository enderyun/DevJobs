import { useState, useEffect } from "react";

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { Pagination } from "../components/Pagination.jsx";


const RESULTS_PER_PAGE = 4; // Cambiar si es necesario

const useFilters = () => {

  const [ filters, setFilters ] = useState({ 
    technology: "",
    location: "",
    experienceLevel: ""
  })
  const [ textToFilter, setTextToFilter ] = useState(""); // Typo en tiempo real
  const [ currentPage, setCurrentPage ] = useState(1); 

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] =useState(0)
  const [loading, setLoading] = useState(true);

  // TODO: implementar boton para limpiar filtros
  // const hasActiveFilters = ???
  // const handleClearFilters = () => {???}

  // TODO: guardar los filtros en localStorage
  useEffect(() => {
    async function fetchJobs() {
      try {

        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('offset', offset)
        params.append('limit', RESULTS_PER_PAGE)

        const queryParams = params.toString()

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)
        const json = await response.json()

        setJobs(json.data)
        setTotal(json.total)


      } catch (error){
        console.error("Ha habido un problema!: ", error)

      } finally {
        setLoading(false)

      }
    }

    fetchJobs()

  }, [filters, textToFilter, currentPage])

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE); 


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

  return {
    jobs,
    total,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

export function SearchPage() {  

  const { jobs, loading, currentPage, totalPages, handlePageChange, handleSearch, handleTextFilter } = useFilters();


  return (
    <main>
      <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter}/>

      <section>
        {
          // TODO: asignarle un spinner
          loading ? <p style={{ textAlign: 'center' }}>Cargando empleos...</p> : <JobListings jobs={jobs} />
        }
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
      </section>
    </main>
  );
}