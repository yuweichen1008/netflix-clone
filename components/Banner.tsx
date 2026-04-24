import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { baseUrl } from '../constants/movie'
import genres from '../constants/genres'
import { Movie } from '../typings'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [, setShowModal] = useRecoilState(modalState)
  const [, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])

  const year = (movie?.release_date || movie?.first_air_date || '').slice(0, 4)
  const overview = movie?.overview
    ? movie.overview.length > 200
      ? movie.overview.slice(0, 200) + '…'
      : movie.overview
    : ''
  const movieGenres = (movie?.genre_ids ?? [])
    .slice(0, 3)
    .map((id) => genres[id])
    .filter(Boolean)

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end">
      {/* Background image */}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          className="object-cover"
          fill
          alt={movie?.title || movie?.name || ''}
          priority
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Meta row */}
      <div className="flex items-center space-x-3 text-sm">
        {movie && movie.vote_average > 0 && (
          <span className="flex items-center space-x-1 text-green-400 font-semibold">
            <span>★</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </span>
        )}
        {year && <span className="text-gray-300">{year}</span>}
        {movieGenres.map((g) => (
          <span
            key={g}
            className="rounded border border-gray-500 px-2 py-0.5 text-xs text-gray-300"
          >
            {g}
          </span>
        ))}
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl drop-shadow-lg">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>

      <p className="max-w-xs text-sm text-gray-200 md:max-w-lg lg:max-w-2xl lg:text-base">
        {overview}
      </p>

      <div className="flex space-x-3 pt-1">
        <button className="bannerButton bg-white text-black hover:bg-white/80">
          <PlayIcon className="h-5 w-5" />
          Play
        </button>
        <button
          className="bannerButton bg-gray-600/70 hover:bg-gray-600/50"
          onClick={() => {
            setCurrentMovie(movie)
            setShowModal(true)
          }}
        >
          <InformationCircleIcon className="h-5 w-5" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default Banner
