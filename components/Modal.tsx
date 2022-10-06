import { XMarkIcon } from '@heroicons/react/24/solid'
import MuiModal from '@mui/material/Modal'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Genre, Movie, Element } from '../typings'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState<Movie | DocumentData | null>(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [data, setData] = useState()

  useEffect(() => {
    if (!movie) return
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
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
  }, [movie])

  console.log(data);


  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className='h-6 w-6' />
        </button>
        <div></div>
      </>
    </MuiModal>
  )
}

export default Modal