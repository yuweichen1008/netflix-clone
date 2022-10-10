import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
    netflixOriginals: Movie[]
}
function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])

    }, [netflixOriginals])

    // console.log(movie)
    return (
        <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh]  lg:justify-end'>
            <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
                <Image
                    src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    layout="fill"
                    objectFit='cover'
                />
            </div>

            <h1 className='text-2xl md:text-4xl lg:text-4xl font-bold'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className='text-s max-w-xs md:max-w-lg lg:max-w-2lg lg:text-2xl'>
                {movie?.overview}
            </p>
            <div className='flex space-x-3'>
                <button className='bannerButton bg-black text-white'>Play</button>
                <button
                    className='bannerButton bg-[red]/60'
                    onClick={() => {
                        setCurrentMovie(movie)
                        setShowModal(true)
                    }}
                >
                    More info
                </button>
            </div>
        </div>
    )
}

export default Banner