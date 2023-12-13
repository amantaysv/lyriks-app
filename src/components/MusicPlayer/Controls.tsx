import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'

interface ControlsProps {
  isPlaying: boolean
  repeat: boolean
  setRepeat: (value: (prev: boolean) => boolean) => void
  shuffle: boolean
  setShuffle: (value: (prev: boolean) => boolean) => void
  currentSongs: []
  handlePlayPause: () => void
  handlePrevSong: () => void
  handleNextSong: () => void
}

const Controls = (props: ControlsProps) => {
  const {
    isPlaying,
    repeat,
    setRepeat,
    shuffle,
    setShuffle,
    currentSongs,
    handlePlayPause,
    handlePrevSong,
    handleNextSong,
  } = props

  return (
    <div className='flex items-center justify-around md:w-36 lg:w-52 2xl:w-80'>
      <BsArrowRepeat
        size={20}
        color={repeat ? 'red' : 'white'}
        onClick={() => setRepeat((prev) => !prev)}
        className='hidden sm:block cursor-pointer'
      />
      {currentSongs?.length && (
        <MdSkipPrevious
          size={30}
          color='#FFF'
          className='cursor-pointer'
          onClick={handlePrevSong}
        />
      )}
      {isPlaying ? (
        <BsFillPauseFill
          size={45}
          color='#FFF'
          onClick={handlePlayPause}
          className='cursor-pointer'
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color='#FFF'
          onClick={handlePlayPause}
          className='cursor-pointer'
        />
      )}
      {currentSongs?.length && (
        <MdSkipNext size={30} color='#FFF' className='cursor-pointer' onClick={handleNextSong} />
      )}
      <BsShuffle
        size={20}
        color={shuffle ? 'red' : 'white'}
        onClick={() => setShuffle((prev) => !prev)}
        className='hidden sm:block cursor-pointer'
      />
    </div>
  )
}

export default Controls
