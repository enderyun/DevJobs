import data from './data.json'
import Header from './components/Header'
import Footer from './components/Footer'
import JobSearch from './components/JobSearch'
import JobCard from './components/JobCard'
import Pagination from './components/Pagination'

// Renderizar una lista de elementos/componentes para mostrarlos en la UI

function App() {
  return (
    <>
    <Header />
    <main>
      <JobSearch />

      <section>
        <h2>Resultados de búsqueda</h2>

        <div className="jobs-listings">
          {data.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <Pagination />
      </section>
    </main>

    <Footer />
    </>
  )
}

export default App

