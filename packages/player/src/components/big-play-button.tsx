import * as React from 'react'
import cx from 'classnames'
import {VideoContext} from '../context/video-context'
import {useSelector} from '@xstate/react'
import {selectCurrentSrc, selectHasStarted} from './player'

export const BigPlayButton: React.FC<any> = ({
  className,
  position = 'center',
}) => {
  const {videoService} = React.useContext(VideoContext)
  const hasStarted = useSelector(videoService, selectHasStarted)
  const currentSrc = useSelector(videoService, selectCurrentSrc)

  function handleClick() {
    videoService.send('PLAY')
  }

  return (
    <button
      className={cx(
        'cueplayer-react-button',
        'cueplayer-react-big-play-button',
        `cueplayer-react-big-play-button-${position}`,
        className,
        {
          'big-play-button-hide': hasStarted || !currentSrc,
        },
      )}
      type="button"
      aria-live="polite"
      tabIndex={0}
      onClick={handleClick}
    >
      <span className="cueplayer-react-control-text">Play Video</span>
    </button>
  )
}
