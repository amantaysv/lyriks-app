interface SeekbarProps {
  appTime: number
  min: string
  max: number
  setSeekTime: (value: number) => void
}

const Seekbar = (props: SeekbarProps) => {
  const { appTime, min, max, setSeekTime } = props
  // converts the time to format 0:00
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeekTime(+event.target.value)
  }

  return (
    <div className='hidden sm:flex flex-row items-center'>
      <button
        type='button'
        onClick={() => setSeekTime(appTime - 5)}
        className='hidden lg:mr-4 lg:block text-white'
      >
        -
      </button>
      <p className='text-white'>{appTime === 0 ? '0:00' : getTime(appTime)}</p>
      <input
        type='range'
        step='any'
        value={appTime}
        min={min}
        max={max}
        onInput={onInput}
        className='md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg'
      />
      <p className='text-white'>{max === 0 ? '0:00' : getTime(max)}</p>
      <button
        type='button'
        onClick={() => setSeekTime(appTime + 5)}
        className='hidden lg:ml-4 lg:block text-white'
      >
        +
      </button>
    </div>
  )
}

export default Seekbar
