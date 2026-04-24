import { existsSync, readFileSync } from 'fs'
import Head from 'next/head'
import { join } from 'path'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import { Movie } from '../typings'
import requests from '../utils/request'

interface Props {
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  sciFiMovies: Movie[]
  kidsMovies: Movie[]
  trendingTV: Movie[]
  topRatedTV: Movie[]
  anime: Movie[]
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  sciFiMovies,
  kidsMovies,
  trendingTV,
  topRatedTV,
  anime,
}: Props) => {
  const showModal = useRecoilValue(modalState)

  return (
    <div
      className={`relative h-screen bg-gradient-to-b ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="lg:space-y-16">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Trending TV Shows" movies={trendingTV} />
          <Row title="Top Rated TV" movies={topRatedTV} />
          <Row title="Anime" movies={anime} />
          <Row title="Action" movies={actionMovies} />
          <Row title="Comedy" movies={comedyMovies} />
          <Row title="Sci-Fi" movies={sciFiMovies} />
          <Row title="Horror" movies={horrorMovies} />
          <Row title="Romance" movies={romanceMovies} />
          <Row title="Kids & Family" movies={kidsMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home

const EMPTY_PROPS: Omit<Props, 'netflixOriginals'> & { netflixOriginals: Movie[] } = {
  netflixOriginals: [],
  trendingNow: [],
  topRated: [],
  actionMovies: [],
  comedyMovies: [],
  horrorMovies: [],
  romanceMovies: [],
  documentaries: [],
  sciFiMovies: [],
  kidsMovies: [],
  trendingTV: [],
  topRatedTV: [],
  anime: [],
}

export const getServerSideProps = async () => {
  // In development, serve from the local cache if available (run `npm run fetch-data` to prime it)
  if (process.env.NODE_ENV === 'development') {
    const cachePath = join(process.cwd(), 'data', 'movies.json')
    if (existsSync(cachePath)) {
      const { fetchedAt, ...movies } = JSON.parse(readFileSync(cachePath, 'utf-8'))
      console.log(`[dev] Using cached movie data (fetched ${fetchedAt})`)
      return { props: movies }
    }
  }

  try {
    const [
      netflixOriginals,
      trendingNow,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
      sciFiMovies,
      kidsMovies,
      trendingTV,
      topRatedTV,
      anime,
    ] = await Promise.all([
      fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
      fetch(requests.fetchTrending).then((res) => res.json()),
      fetch(requests.fetchTopRated).then((res) => res.json()),
      fetch(requests.fetchActionMovies).then((res) => res.json()),
      fetch(requests.fetchComedyMovies).then((res) => res.json()),
      fetch(requests.fetchHorrorMovies).then((res) => res.json()),
      fetch(requests.fetchRomanceMovies).then((res) => res.json()),
      fetch(requests.fetchDocumentaries).then((res) => res.json()),
      fetch(requests.fetchSciFiMovies).then((res) => res.json()),
      fetch(requests.fetchKidsMovies).then((res) => res.json()),
      fetch(requests.fetchTrendingTV).then((res) => res.json()),
      fetch(requests.fetchTopRatedTV).then((res) => res.json()),
      fetch(requests.fetchAnime).then((res) => res.json()),
    ])

    return {
      props: {
        netflixOriginals: netflixOriginals.results ?? [],
        trendingNow:      trendingNow.results ?? [],
        topRated:         topRated.results ?? [],
        actionMovies:     actionMovies.results ?? [],
        comedyMovies:     comedyMovies.results ?? [],
        horrorMovies:     horrorMovies.results ?? [],
        romanceMovies:    romanceMovies.results ?? [],
        documentaries:    documentaries.results ?? [],
        sciFiMovies:      sciFiMovies.results ?? [],
        kidsMovies:       kidsMovies.results ?? [],
        trendingTV:       trendingTV.results ?? [],
        topRatedTV:       topRatedTV.results ?? [],
        anime:            anime.results ?? [],
      },
    }
  } catch (err) {
    console.error('Failed to fetch movie data:', err)
    return { props: EMPTY_PROPS }
  }
}
