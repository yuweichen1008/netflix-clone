import React from 'react'
import { Movie } from '../typings'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  movies: Movie[]
}
function Row({ title, movies }: Props) {
  return (
    <div className='h-40 space-y-0.5'>
      <h2 className='cursor-pointer text-[#e5e5e5] transition duration-200 hover:text-white'>
        {title}
      </h2>
      <div className='group relative md:-ml-2'>
        <ChevronLeftIcon className='absolute top-0 bottom-0 left-2 z-40 h-9 w-9 m-auto cursor-pointer opacity-10 transition hover:scale-125 group-hover:opacity-100' />
        <div className='flex items-center space-x-1 overflow-x-scroll scrollbar-hide'>
          {movies.map((movie) =>
            <Thumbnail key={movie.id} movie={movie} />
          )}
        </div>
        <ChevronRightIcon className='absolute top-0 bottom-0 left-2 z-40 h-9 w-9 m-auto cursor-pointer opacity-10 transition hover:scale-125 group-hover:opacity-100' />
      </div>
    </div>
  )
}

export default Row