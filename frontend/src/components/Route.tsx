import { useRouter } from "../hooks/useRouter.ts";

interface RouteProps {
  path: string
  component: React.ComponentType
}

export function Route({ path, component: Component }: RouteProps) {

  const { currentPath } = useRouter()

  if (currentPath !== path) return null
  return <Component />

}