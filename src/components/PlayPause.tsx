import { useAppDispatch, useAppSelector } from '@hooks'
import { playPause } from '@redux/features/playerSlice'
import { SongData } from 'interfaces'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
interface PlayPauseProps {
  song: SongData
  handlePlay: () => void
}

const PlayPause = ({ handlePlay, song }: PlayPauseProps) => {
  const dispatch = useAppDispatch()

  const { activeSong, isPlaying } = useAppSelector((state) => state.player)

  const handlePause = () => {
    dispatch(playPause(false))
  }

  if (isPlaying && activeSong.title === song.title) {
    return <FaPauseCircle className='text-gray-300' size={35} onClick={handlePause} />
  } else {
    return <FaPlayCircle className='text-gray-300' size={35} onClick={handlePlay} />
  }
}

export default PlayPause
