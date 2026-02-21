import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Link } from "../components/Link.jsx"
import snarkdown from "snarkdown"
import styles from "./Detail.module.css"
import { useAuthStore } from "../store/authStore.js"
import { useFavoritesStore } from "../store/favoritesStore.js"

const API_URL = import.meta.env.VITE_API_URL
// TODO: lo recomendable es que las funciones anexas a JobDetail
// se pasen a diferentes componentes (archivos)

function JobSection({ title, content }) {
  const html = snarkdown(content ?? '')

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
      </h2>

      <div className={`${styles.sectionContent} prose`}
        // TODO: Verificar alternativas como react-markdown.
        // Aunque es peligroso, sabemos de antemano que 
        // la data viene de un API controlada por nosotros.
        dangerouslySetInnerHTML={{ 
          __html: html 
        }} 
      />
    </section>

  )
}

function DetailPageBreadcrumb({ job }) {
  return (
    <nav className={styles.breadcrumbs}>
      <Link 
        to="/search"
        className={styles.breadcrumbButton}
      >
        Inicio
      </Link>
      <span className={styles.breadcrumbSeparator}>/</span>
      <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
    </nav>
  )
}

function DetailPageHeader({ job }) {
  return (
    <>  
      <header className={styles.header}>
        <h1 className={styles.title}>
          {job.titulo}
        </h1>
        <p className={styles.meta}>
          {job.empresa} - {job.ubicacion}
        </p>
      </header>

      <DetailApplyButton />
      <DetailFavoriteButton jobId={job.id} />

    </>
  )
} 

function DetailApplyButton() {
  const { isLoggedIn } = useAuthStore()
  return (
    <button disabled={!isLoggedIn} className={styles.applyButton}>
      {isLoggedIn ? 'Aplicar ahora' : 'Iniciar sesión para aplicar'}
    </button>
  )
}

function DetailFavoriteButton ({ jobId }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore()

  return (
    <button 
    onClick={() => toggleFavorite(jobId)}
    aria-label={isFavorite(jobId) ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {isFavorite(jobId) ? "❤️" : "🤍"}
    </button>
  )
}

function AISummary ({ jobId }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateSummary = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/ai/summary/${jobId}`)
      if (!response.ok) {
        throw new Error('Summary not found')
      }
      const data = await response.json()
      setSummary(data.summary)
    } catch {
      setError('Error al generar el resumen')
    } finally {
      setLoading(false)
    }
  }

  if (summary) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Resumen generado por IA
        </h2>
        <div className={styles.sectionContent}>
          <p>{summary}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Resumen generado por IA
        </h2>
        <div className={styles.sectionContent}>
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <button 
      onClick={generateSummary}
      disabled={loading}
      className={styles.applyButton}
    >
      {loading ? 'Generando resumen...' : 'Generar resumen'}
    </button>
  ) 
}

export default function JobDetail() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/jobs/${jobId}`)
      .then(response => {
        if (!response.ok) throw new Error('Job Not Found')
        return response.json()
      })
      .then(json => {
        setJob(json)
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [jobId])

  if (loading) {
    return <div className="spinner-container">
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
                <path d="M13 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              </svg>
            </div>
  }

  if (error || !job) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.875rem', fontWeight: '700' }}>
            Oferta no encontrada :(
          </h2>
        </div>
        <button
          onClick={() => navigate('/search')}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Volver al inicio
        </button>
      </div>
    )
  } 

  return (
    <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1rem'}}>

      <DetailPageBreadcrumb job={job} />
      <DetailPageHeader job={job} />
      <AISummary jobId={job.id} />

      <JobSection title="Descripción del puesto" content={job.content.description} />
      <JobSection title="Responsabilidades" content={job.content.responsibilities} />
      <JobSection title="Requisitos" content={job.content.requirements} />
      <JobSection title="Acerca de la empresa" content={job.content.about} />
    </div>
  )
}