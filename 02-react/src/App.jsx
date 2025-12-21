import data from "./data.json";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";
import { Pagination } from "./components/Pagination.jsx";

// Renderizar una lista de elementos/componentes para mostrarlos en la UI

function App() {
  const handlePageChange = (page) => {
    console.log("Cambiando la pagina ", page);
  };
  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section>
          <h2>Resultados de búsqueda</h2>
          {data.map((job) => (
            <JobListings key={job.id} job={job} />
          ))}

          <Pagination currentPage={2} onPageChange={handlePageChange}/>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
