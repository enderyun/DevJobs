import { Link as NavLink } from "react-router";
import { useRouter } from "../hooks/useRouter";

export function Link({ href, children, className = "", ...restOfProps }) {
  // TODO: currentPath debe de usarse para la clase isActive
  const { currentPath } = useRouter(); // 

  const linkIsActive = currentPath === href ? "isActive" : "";

  return (
    <NavLink
      to={href}
      // Por lo general no se deberia de pasar ningun atributo adicional a
      // este componente, pero si se cambia de parecer en el futuro no hay problema
      className={`${className} ${linkIsActive}`}
      {...restOfProps}
    >
      {children}
    </NavLink>
  );
}
