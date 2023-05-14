import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import Head from 'next/head'

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
      <Head><title>task matcher</title></Head>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
