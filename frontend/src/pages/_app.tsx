import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

const App = ({ Component, pageProps }: AppProps) => {
  const link = createHttpLink({
    uri: 'http://localhost:8080/query',
    credentials: 'include',
  })
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
