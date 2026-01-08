import { useId, useState } from "react";


let timeoutId = null;

const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter }) => {
  const [searchText, setSearchText] = useState("") // Por el momento no se usa 
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // event.target !== event.currentTarget
    const formData = new FormData(event.currentTarget)

    /* 
    Cancelar el fetch de los filtros, ya que el usuario está
    escribiendo en el input 
    */
    if (event.target.name === idText) return 
 
    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }

    console.log(filters)
    onSearch(filters);
  }

  /*
  TODO: el handleTextChange y handleSubmit deberian estar en una sola funcion
  y no en dos separadas 
  */

  const handleTextChange = (event) => {
    const text = event.target.value
    setSearchText(text) // Por el momento no se usa 

    
    //Debounce: cancelar la llamada anterior
    if (timeoutId) {
      clearTimeout(timeoutId) // En dado caso esté una llamada a la API en progeso
    }

    timeoutId = setTimeout(() => {
    onTextFilter(text)
    }, 500) 
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange
  }
}

export function SearchFormSection({ onSearch, onTextFilter }) { 
  const idText = useId(); // Input 
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();

  const { handleSubmit, handleTextChange } = useSearchForm({ 
    idTechnology,
    idLocation,
    idExperienceLevel,
    idText,
    onSearch, // Proveniente del Search.jsx (filtros de technology, location y experienceLevel)
    onTextFilter // Proveniente del Search.jsx (input text)
  })

    
    return (
     <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico.</p>

        <form onChange={handleSubmit} id="empleos-search-form" role="search" >
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
              onChange={handleTextChange}
            />
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

