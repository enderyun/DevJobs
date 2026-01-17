import { useState, useEffect } from "react";

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { Pagination } from "../components/Pagination.jsx";
import { useRouter } from "../hooks/useRouter.jsx";
import { useSearchParams } from "react-router";

const RESULTS_PER_PAGE = 4; // Cambiar si es necesario

// TODO: Este hook probablemente vaya en un archivo separado
const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [ filters, setFilters ] = useState(() => { 
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || '',
    }
  })

  const [ textToFilter, setTextToFilter ] = useState(() => searchParams.get('text') || '')

  const [ currentPage, setCurrentPage ] = useState(() => { 
    const page = Number(searchParams.get('page'))
    // Evitar que se inyecte un NaN o un número negativo en la URL 
    return (!page || page < 1) ? 1 : page
  })

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] =useState(0)
  const [loading, setLoading] = useState(true);

  const { navigateTo } = useRouter() // No se usa por el momento

  // Para el boton "limpiar filtros" en el SearchFormSection
  const hasActiveFilters = Object.values(filters).some(value => value !== "")


  // TODO: guardar los filtros en localStorage
  // Fetch a la API
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


  // Actualizar la URL
  useEffect(() => {
    setSearchParams((params) => {
      if (textToFilter) params.set('text', textToFilter)
      if (filters.technology) params.set('technology', filters.technology)
      if (filters.location) params.set('type', filters.location)
      if (filters.experienceLevel) params.set('level', filters.experienceLevel)
      
      if (currentPage > 1) params.set('page', currentPage)

      return params
    })
    
    /*
    *  El useEffect estaba causando un loop infinito al momento de
    *  actualizar la URL con navigateTo. Será una solución temporal
    *  hasta que se implemente el hook useCallback.
    */

  }, [currentPage, filters, textToFilter, setSearchParams])

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

  const handleClearFilters = () => {
    setFilters({
      technology: "",
      location: "",
      experienceLevel: ""
    });
    setTextToFilter("");
    setCurrentPage(1);

    // TODO: Limpiar el localStorage cuando se llegue a implementar
  }

  return {
    jobs,
    total,
    loading,
    currentPage,
    totalPages,
    filters,
    textToFilter,
    hasActiveFilters,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleClearFilters
  }
}

export default function SearchPage() {  

  const { jobs, loading, currentPage, totalPages, filters, textToFilter, hasActiveFilters, handlePageChange, handleSearch, handleTextFilter, handleClearFilters } = useFilters();


  return (
    <main>
      <SearchFormSection 
        hasActiveFilters={hasActiveFilters} 
        onSearch={handleSearch} 
        onTextFilter={handleTextFilter} 
        onClearFilters={handleClearFilters}
        initialText={textToFilter}
        initialFilters={filters}
      />

      <section>
        {
          // Este spinner solo sera temporal
          loading 
          ? <div className="spinner-container">
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
                <path d="M13 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              </svg>
              {/* SVG anterior (whirl icon):
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0" />
                <path d="M12 21c-3.314 0 -6 -2.462 -6 -5.5s2.686 -5.5 6 -5.5" />
                <path d="M21 12c0 3.314 -2.462 6 -5.5 6s-5.5 -2.686 -5.5 -6" />
                <path d="M12 14c3.314 0 6 -2.462 6 -5.5s-2.686 -5.5 -6 -5.5" />
                <path d="M14 12c0 -3.314 -2.462 -6 -5.5 -6s-5.5 2.686 -5.5 6" />
              </svg>
              */}
            </div>
          : <JobListings jobs={jobs} />
        }
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
      </section>
    </main>
  );
}