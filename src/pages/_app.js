import "../styles/tailwind.css";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import Layout from "../components/Layout";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps["dehydratedState"]}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
  )
}
