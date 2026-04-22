/**
 * npm run fetch-data
 *
 * Fetches all content categories from TMDB and writes them to data/movies.json.
 * Run this once to prime the local cache; the dev server will use the file
 * instead of hitting TMDB on every page reload.
 *
 * Requires NEXT_PUBLIC_TMDB_API_KEY in .env.local
 */

import { config } from 'dotenv'
import { mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
if (!API_KEY) {
  console.error('Error: NEXT_PUBLIC_TMDB_API_KEY is not set in .env.local')
  process.exit(1)
}

const BASE = 'https://api.themoviedb.org/3'

const endpoints: Record<string, string> = {
  netflixOriginals: `${BASE}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  trendingNow:      `${BASE}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  topRated:         `${BASE}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  actionMovies:     `${BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  comedyMovies:     `${BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  horrorMovies:     `${BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  romanceMovies:    `${BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  documentaries:    `${BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  sciFiMovies:      `${BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=878`,
  kidsMovies:       `${BASE}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10751&certification_country=US&certification.lte=G`,
  trendingTV:       `${BASE}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  topRatedTV:       `${BASE}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  anime:            `${BASE}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja`,
}

async function fetchCategory(name: string, url: string): Promise<[string, unknown[]]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`)
  const json = await res.json() as { results?: unknown[] }
  return [name, json.results ?? []]
}

async function main() {
  console.log('Fetching content from TMDB...\n')

  const entries = Object.entries(endpoints)
  const results = await Promise.all(
    entries.map(([name, url]) => fetchCategory(name, url))
  )

  const data: Record<string, unknown> = { fetchedAt: new Date().toISOString() }
  for (const [name, items] of results) {
    data[name] = items
    console.log(`  ${name.padEnd(18)} ${(items as unknown[]).length} items`)
  }

  const outDir = resolve(process.cwd(), 'data')
  const outFile = resolve(outDir, 'movies.json')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(outFile, JSON.stringify(data, null, 2))

  console.log(`\nSaved to data/movies.json  (fetchedAt: ${data.fetchedAt})`)
}

main().catch(err => {
  console.error('\nFailed:', err.message)
  process.exit(1)
})
