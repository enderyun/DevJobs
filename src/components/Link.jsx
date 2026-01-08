import { useRouter } from "../hooks/useRouter.jsx";

export function Link({ href, children, className = "", ...restOfProps }) {
  const { navigateTo, currentPath } = useRouter();

  // href: direccion desde el Route.jsx/App.jsx
  // currentPath: window.location.pathname del useRouter

  const handleClick = (event) => {
    event.preventDefault();
    navigateTo(href);
  };

  const linkIsActive = currentPath === href ? "isActive" : "";

  return (
    <a
      href={href}
      onClick={handleClick}
      // Por lo general no se deberia de pasar ningun atributo adicional a
      // este componente, pero si se cambia de parecer en el futuro no hay problema
      className={`${className} ${linkIsActive}`}
      {...restOfProps}
    >
      {children}
    </a>
  );
}
