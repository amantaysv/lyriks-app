import { useAppDispatch } from '@hooks'
import { playPause, setActiveSong } from '@redux/features/playerSlice'
import { SongData } from 'interfaces'
import { Link } from 'react-router-dom'
import PlayPause from './PlayPause'

interface SongCardProps {
  song: SongData
  i: number
  activeSong: SongData
  data: any
}

const SongCard = ({ song, i, activeSong, data }: SongCardProps) => {
  const dispatch = useAppDispatch()
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  return (
    <div className='flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative w-full h-56 group'>
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'
          }`}
        >
          <PlayPause song={song} handlePlay={handlePlayClick} />
        </div>
        <img src={song.images.coverart} alt='song cover' className='w-full h-full rounded-lg' />
      </div>
      <div className='mt-4 flex flex-col'>
        <p className='text-white text-lg font-semibold truncate'>
          <Link to={`/songs/${song.key}`}>{song.title}</Link>
        </p>
        <p className='text-sm truncate text-gray-300 mt-1'>
          <Link to={`/artists/${song.artists[0].adamid}`}>{song.subtitle}</Link>
        </p>
      </div>
    </div>
  )
}

export default SongCard
