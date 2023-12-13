import { ChangeEvent } from 'react'
import { BsFillVolumeMuteFill, BsFillVolumeUpFill, BsVolumeDownFill } from 'react-icons/bs'

interface VolumeBarProps {
  value: number
  min: string
  max: string
  setVolume: (value: number) => void
}

const VolumeBar = (props: VolumeBarProps) => {
  const { value, min, max, setVolume } = props
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(+event?.target.value)
  }
  return (
    <div className='hidden lg:flex flex-1 items-center justify-end'>
      {value <= 1 && value > 0.5 && (
        <BsFillVolumeUpFill size={25} color='#FFF' onClick={() => setVolume(0)} />
      )}
      {value <= 0.5 && value > 0 && (
        <BsVolumeDownFill size={25} color='#FFF' onClick={() => setVolume(0)} />
      )}
      {value === 0 && <BsFillVolumeMuteFill size={25} color='#FFF' onClick={() => setVolume(1)} />}
      <input
        type='range'
        step='any'
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className='2xl:w-40 lg:w-32 md:w-32 h-1 ml-2'
      />
    </div>
  )
}

export default VolumeBar
