import { useState } from "react";
import data from "./data.json";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";
import { JobCard } from "./components/JobCard.jsx";
import { Pagination } from "./components/Pagination.jsx";

function App() {
  const [ currentPage, setCurrentPage ] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    console.log("Cambiando la pagina ", page); 
    setCurrentPage(page);
  };
  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section>
          <JobListings />
          {/* {data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))} */}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
