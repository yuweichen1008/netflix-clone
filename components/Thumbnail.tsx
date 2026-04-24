import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Element, Movie } from '../typings'

interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  const [, setShowModal] = useRecoilState(modalState)
  const [, setCurrentMovie] = useRecoilState(movieState)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [hovered, setHovered] = useState(false)
  const [fetched, setFetched] = useState(false)

  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4)
  const title = movie.title || movie.name || ''

  const handleMouseEnter = async () => {
    setHovered(true)
    if (fetched) return
    setFetched(true)
    try {
      const type = movie.media_type === 'tv' ? 'tv' : 'movie'
      const data = await fetch(
        `https://api.themoviedb.org/3/${type}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos`
      ).then((r) => r.json())
      const trailer = data?.videos?.results?.find(
        (v: Element) => v.type === 'Trailer'
      )
      if (trailer) setTrailerKey(trailer.key)
    } catch {
      // no trailer available — static poster stays
    }
  }

  const openModal = () => {
    setCurrentMovie(movie)
    setShowModal(true)
  }

  return (
    <div
      className="group relative min-w-[160px] h-[240px] cursor-pointer flex-shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster image */}
      <Image
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path || movie.backdrop_path}`}
        className="rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
        fill
        alt={title}
      />

      {/* Rating badge — bottom left */}
      {movie.vote_average > 0 && (
        <span className="absolute bottom-2 left-2 z-10 flex items-center space-x-0.5 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-yellow-400">
          <span>★</span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </span>
      )}

      {/* Year badge — bottom right */}
      {year && (
        <span className="absolute bottom-2 right-2 z-10 rounded bg-black/70 px-1.5 py-0.5 text-xs text-gray-300">
          {year}
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between rounded-md bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* Trailer clip — muted autoplay */}
        {hovered && trailerKey && (
          <div className="absolute inset-0 overflow-hidden rounded-md">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerKey}`}
              width="100%"
              height="100%"
              playing
              muted
              loop
              controls={false}
              config={{ youtube: { playerVars: { disablekb: 1, modestbranding: 1 } } }}
            />
          </div>
        )}

        {/* Title + action buttons pinned to bottom */}
        <div className="relative z-10 mt-auto p-2">
          <p className="mb-1 line-clamp-2 text-xs font-semibold leading-tight text-white drop-shadow">
            {title}
          </p>
          <div className="flex space-x-1">
            <button
              onClick={openModal}
              className="flex flex-1 items-center justify-center gap-1 rounded bg-white py-1 text-xs font-bold text-black hover:bg-white/80"
            >
              <PlayIcon className="h-3 w-3" />
              Play
            </button>
            <button
              onClick={openModal}
              className="flex items-center justify-center rounded border border-white/50 px-2 py-1 text-white hover:bg-white/10"
              title="More info"
            >
              <InformationCircleIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thumbnail
