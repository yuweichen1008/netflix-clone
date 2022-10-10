import { PlayIcon, XMarkIcon, PlusIcon, HandThumbUpIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import MuiModal from '@mui/material/Modal'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Genre, Movie, Element } from '../typings'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState<Movie | DocumentData | null>(movieState)
  const [trailer, setTrailer] = useState('')
  const [muted, setMuted] = useState(true)
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    if (!movie) return
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }
    fetchMovie()
    console.log(movie);
  }, [movie])

  // console.log(trailer)

  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className='h-6 w-6' />
        </button>
        <div className='relative pt-[56%]'>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100vh"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className='flex space-x-2'>
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <PlayIcon className="h-7 w-7 text-black" />
                Play
              </button>

              <button className='modalButton'>
                <PlusIcon />
              </button>

              <button className='modalButton'>
                <HandThumbUpIcon />
              </button>
            </div>
            {/* muted */}
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className='roundedb-md'>
          <div className='space-y-4'>
            <div className='flex items-center text-sm space-x-2'>
              <p className='text-green-400'>
                {movie?.vote_average * 10} % Match
              </p>
              <p className='font-light'>
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className='flex border border-white/40 roundedh-4'>
                HD
              </div>

            </div>
            <div>
              <p className='w-5/6'>{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span>Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>

              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal