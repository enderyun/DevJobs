// Este componente es un wrapper de react-router Link
// que traduce los href a to

// El motivo de este archivo, que por el momento es totalmente innecesario, se creó antes
// de agregar react-router (se manejaban los Links de manera nativa), y se dejó para 
// evitar tener que cambiar los imports en toda la app.

// Aunque actualmente no hace nada, en el futuro podria ser útil para agregar lógica común a 
// todos los Links, como tracking de clicks, estilos comunes, etc.

// Lo dejaré así por ahora, pero si en el futuro no se le da ningún uso, lo reemplazaré por el 
// import Link de react-router.



import { Link as NavLink } from "react-router";

// Types
import type { ReactNode } from "react";
import type { LinkProps } from "react-router";


interface Props extends Omit<LinkProps, 'to'> {
  href: string;
  children: ReactNode;
}

export function Link({ href, children, ...restOfProps }: Props) {

  return (
    <NavLink
      to={href}
      {...restOfProps}
    >
      {children}
    </NavLink>
  );
}
