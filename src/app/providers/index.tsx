import { ReduxProvider } from './ReduxProvider'

interface AppProvidersProps {
  children: React.ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}