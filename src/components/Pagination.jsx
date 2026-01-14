import styles from "./Pagination.module.css"

export function Pagination({ currentPage = 1, totalPages = 5, onPageChange}) {
	//Array de paginas para renderizar
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

	const isFirstPage = currentPage === 1; 
	const isLastPage = currentPage === totalPages;

	const sytlePrevButton = isFirstPage ? {pointerEvents: "none", opacity: 0.5} : {};
	const sytleNextButton = isLastPage ? {pointerEvents: "none", opacity: 0.5} : {};

	const handlePrevClick = (event) => {
		event.preventDefault();
		if (!isFirstPage) {
			onPageChange(currentPage - 1);
		}
	}

	const handleNextClick = (event) => {
		event.preventDefault();
		if (!isLastPage) {
			onPageChange(currentPage + 1);
		}
	}

	const handleChangePage = (event) => {
		event.preventDefault();
    const page = Number(event.target.dataset.page)
		if (page !== currentPage) {
			onPageChange(page)
		}
	}

  const buildPagesUrl = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }


  return (
    <nav className={styles.pagination}>
      <a href={buildPagesUrl(currentPage - 1)} style={sytlePrevButton} onClick={handlePrevClick}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

			{pages.map((page) => (
				<a href={buildPagesUrl(page)}
          key={page}
          data-page={page}
					className={currentPage === page ? styles.isActive : ""}
					onClick={handleChangePage}
				>
					{page}
				</a>
			))}

      <a href={buildPagesUrl(currentPage + 1)} style={sytleNextButton} onClick={handleNextClick}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
    </nav>
  );
}
