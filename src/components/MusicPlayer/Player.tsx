import { ChangeEvent, useEffect, useRef } from 'react'

interface PlayerProps {
  activeSong: any
  isPlaying: boolean
  volume: number
  seekTime: number
  onEnded: () => void
  onTimeUpdate: (event: ChangeEvent<HTMLAudioElement>) => void
  onLoadedData: (event: ChangeEvent<HTMLAudioElement>) => void
  repeat: boolean
}

const Player = (props: PlayerProps) => {
  const { activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat } =
    props
  const ref = useRef<HTMLAudioElement>(null)
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }

  useEffect(() => {
    if (ref.current) ref.current.volume = volume
  }, [volume])
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current) ref.current.currentTime = seekTime
  }, [seekTime])

  return (
    <audio
      src={activeSong?.hub?.actions[1]?.uri}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  )
}

export default Player
