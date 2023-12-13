import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '@hooks'
import { nextSong, playPause, prevSong } from '../../redux/features/playerSlice'
import Controls from './Controls'
import Player from './Player'
import Seekbar from './Seekbar'
import Track from './Track'
import VolumeBar from './VolumeBar'

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useAppSelector(
    (state) => state.player
  )
  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [appTime, setAppTime] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true))
  }, [currentIndex])

  const handlePlayPause = () => {
    if (!isActive) return

    if (isPlaying) {
      dispatch(playPause(false))
    } else {
      dispatch(playPause(true))
    }
  }

  const handleNextSong = () => {
    dispatch(playPause(false))

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length))
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)))
    }
  }

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1))
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)))
    } else {
      dispatch(prevSong(currentIndex - 1))
    }
  }

  return (
    <div className='relative sm:px-12 px-8 w-full flex items-center justify-between'>
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className='flex-1 flex flex-col items-center justify-center'>
        <Controls
          isPlaying={isPlaying}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar appTime={appTime} min='0' max={duration} setSeekTime={setSeekTime} />
        <Player
          activeSong={activeSong}
          isPlaying={isPlaying}
          volume={volume}
          seekTime={seekTime}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
          repeat={repeat}
        />
      </div>
      <VolumeBar value={volume} min='0' max='1' setVolume={setVolume} />
    </div>
  )
}

export default MusicPlayer
