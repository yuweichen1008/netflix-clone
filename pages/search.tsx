import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Thumbnail from '../components/Thumbnail'
import { Movie } from '../typings'
import requests from '../utils/request'

function Search() {
  const router = useRouter()
  const q = typeof router.query.q === 'string' ? router.query.q : ''
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!q) return
    setLoading(true)
    fetch(requests.fetchSearch(q))
      .then((r) => r.json())
      .then((data) => setResults(data.results ?? []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false))
  }, [q])

  return (
    <div className="min-h-screen bg-[#141414]">
      <Head>
        <title>{q ? `"${q}" — Netflix` : 'Search — Netflix'}</title>
      </Head>
      <Header />

      <main className="px-4 pt-24 pb-16 lg:px-16">
        {q && (
          <h2 className="mb-6 text-xl font-semibold text-white">
            {loading ? 'Searching…' : `Results for "${q}"`}
          </h2>
        )}

        {!loading && q && results.length === 0 && (
          <p className="text-gray-400">
            No results found for <span className="text-white">"{q}"</span>. Try a different title or keyword.
          </p>
        )}

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {results
            .filter((m) => m.poster_path || m.backdrop_path)
            .map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
        </div>
      </main>
    </div>
  )
}

export default Search
