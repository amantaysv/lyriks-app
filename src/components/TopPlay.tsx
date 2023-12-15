import { useAppDispatch, useAppSelector } from '@hooks'
import { playPause, setActiveSong } from '@redux/features/playerSlice'
import { useGetTopChartsQuery } from '@redux/services/shazamCore'
import { SongData } from 'interfaces'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PlayPause from './PlayPause'

interface TopChartsItemProps {
  song: SongData
  i: number
  data: SongData[]
  activeSong: SongData
}

const TopChartsItem = ({ i, song, activeSong, data }: TopChartsItemProps) => {
  const dispatch = useAppDispatch()

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === song.title ? 'bg-[#4c426e]' : 'bg-transparent'
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className='font-bold text-base text-white mr-3'>{i + 1}</h3>
      <div className='flex-1 flex flex-row justify-between items-center'>
        <img src={song.images.coverart} className='w-20 h-20 rounded-lg' alt='' />
        <div className='flex-1 flex flex-col justify-center mx-3'>
          <p className='text-xl font-bold text-white'>
            <Link to={`/songs/${song.key}`}>{song.title}</Link>
          </p>
          <p className='text-base text-gray-300 mt-1'>
            <Link to={`/artists/${song.artists[0].adamid}`}>{song.subtitle}</Link>
          </p>
        </div>
      </div>
      <PlayPause song={song} handlePlay={handlePlayClick} />
    </div>
  )
}

const TopPlay = () => {
  const { data } = useGetTopChartsQuery()

  const { activeSong } = useAppSelector((state) => state.player)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView()
  }, [data])

  return (
    <div
      ref={ref}
      className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'
    >
      <div className='w-full flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl'>Top Charts</h2>
          <Link to='/top-charts' className='text-gray-300 text-base cursor-pointer'>
            See more
          </Link>
        </div>
        <div className='mt-4 flex flex-col gap-1'>
          {data?.slice(0, 5).map((song, i) => (
            <TopChartsItem key={song.key} song={song} i={i} data={data} activeSong={activeSong} />
          ))}
        </div>
      </div>
      {/* swiper */}
      <div></div>
    </div>
  )
}

export default TopPlay
