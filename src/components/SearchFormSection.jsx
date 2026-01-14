import { useId, useRef } from "react";

// TODO: Esto es un hook, por lo que no debe estar en este componente
const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, inputRef, onSearch, onTextFilter, onClearFilters }) => {
  // const [searchText, setSearchText] = useState("") 
  
  const timeoutId = useRef(null)

  const handleSubmit = (event) => {
    /* 
    Cancela el fetch de los filtros, ya que el usuario está
    escribiendo en el input
    */
    if (event.target.name === idText) { 
      const text = event.target.value
      // setSearchText(text) // Por el momento no se usa 

      //Debounce: cancelar la llamada anterior
      if (timeoutId.current) {
        clearTimeout(timeoutId.current) // En dado caso esté una llamada a la API en progeso
        // En otras palabras: el usuario sigue escribiendo
      }

      timeoutId.current = setTimeout(() => {
      onTextFilter(text)
      }, 500)
      
      return
    }    
    
    event.preventDefault();
    // event.target !== event.currentTarget
    const formData = new FormData(event.currentTarget)

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }

    onSearch(filters);
  }

  // Funcion antigua para el input text

  // const handleTextChange = (event) => {
  //   const text = event.target.value
  //   setSearchText(text) // Por el momento no se usa 

    
  //   //Debounce: cancelar la llamada anterior
  //   if (timeoutId) {
  //     clearTimeout(timeoutId) // En dado caso esté una llamada a la API en progeso
  //   }

  //   timeoutId = setTimeout(() => {
  //   onTextFilter(text)
  //   }, 500)
  // }

  const handleClearFilters = () => {
    inputRef.current.reset(); 
    onClearFilters()
  }

  return {
    //searchText, // No se usa por el momento
    handleSubmit,
    handleClearFilters
  }
}

export function SearchFormSection({ onSearch, onTextFilter, onClearFilters, hasActiveFilters }) { 
  const idText = useId(); // Input 
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();
  const inputRef = useRef()

  const { handleSubmit, handleClearFilters } = useSearchForm({ 
    idTechnology,
    idLocation,
    idExperienceLevel,
    idText,
    inputRef,
    /*
    No se usan en el codigo, sino que al venir del Search.jsx se necesita pasar por el 
    SearchFormSection, y luego se envian al useSearchForm
    */
    hasActiveFilters,
    onSearch, // Proveniente del Search.jsx (filtros de technology, location y experienceLevel)
    onTextFilter, // Proveniente del Search.jsx (input text)
    onClearFilters // Proveniente del Search.jsx (limpiar filtros)
  })

    
    return (
     <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>

        <form onChange={handleSubmit} id="empleos-search-form" role="search" ref={inputRef}>
          <div className="search-bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>

            <input
              name={idText}
              id="empleos-search-input"
              type="text"
              placeholder="Buscar trabajos, empresas o habilidades"
            />

            {
              hasActiveFilters 
              ? (
                <button type="button" onClick={handleClearFilters}>
                  Limpiar filtros
                </button>
                ) 
              : null
            }
          </div>

          <div className="search-filters">
            <select name={idTechnology} id="filter-technology">
              <option value="">Tecnología</option>
              <optgroup label="Tecnologías populares">
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
                <option value="nodejs">Node.js</option>
              </optgroup>
              <option value="java">Java</option>
              <hr />
              <option value="csharp">C#</option>
              <option value="c">C</option>
              <option value="c++">C++</option>
              <hr />
              <option value="ruby">Ruby</option>
              <option value="php">PHP</option>
            </select>

            <select name={idLocation} id="filter-location">
              <option value="">Ubicación</option>
              <option value="remoto">Remoto</option>
              <option value="cdmx">Ciudad de Mexico</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="barcelona">Barcelona</option>
            </select>

            <select name={idExperienceLevel} id="filter-experience-level">
              <option value="">Nivel de experiencia</option>
              <option value="junior">Junior</option>
              <option value="mid-level">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </form>

        <span id="filter-selected-value"></span>
      </section>
    );
}

