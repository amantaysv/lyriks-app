import { genres } from '@assets'
import { Error, Loader, SongCard } from '@components'
import { useGetTopChartsQuery } from '@redux/services/shazamCore'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
console.log('genres:', genres)

const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError => 'status' in error

const Discover = () => {
  const { data, isFetching, error } = useGetTopChartsQuery()
  console.log('Discover ~ error:', error)
  console.log('Discover ~ isFetching:', isFetching)
  console.log('Discover ~ data:', data)

  if (isFetching) return <Loader title='Loading songs...' />

  if (isFetchBaseQueryErrorType(error)) return <Error message={error?.data?.message} />

  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
        <h2 className='font-bold text-3xl text-white text-left'>Discover</h2>
        <select className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>
          {genres.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {new Array(10).fill(null).map((_, index) => (
          <SongCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default Discover
