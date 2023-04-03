import React from 'react'
import PropTypes from 'prop-types'
import { keyframes } from 'styled-components'
import { useTheme } from '@aragon/ui'

const PATH = `
  M 10,80 L 40,10 L 70,50 L 100,10 L 130,80
`

const STROKE_WIDTH = 7
const LOOP_DURATION = 1800
const DONE_TRANSITION_DURATION = 400
const DASH_ARRAY = 348.5 // circumference, found by manually incrementing it :o
const GRADIENT_COLOR_START = '#2CF4E1'
const GRADIENT_COLOR_STOP = '#2CB2E1'
const ANIM_FUNCTION = 'cubic-bezier(0.7, 0, 0.3, 1)'
const GRADIENT_ID = 'loading-screen-logo-gradient'

const animGradient = keyframes`
  0% { stroke-dashoffset: ${DASH_ARRAY} }
  60%, 100% { stroke-dashoffset: 0 }
`

const animMask = keyframes`
  0%, 10% { stroke-dashoffset: ${DASH_ARRAY} }
  90%, 100% { stroke-dashoffset: 0 }
`

const AnimatedLogo = React.memo(function AnimatedLogo({ done }) {
  return (
    <svg width={150} height={150} fill="none">
      <Outline />
      <Outline
        gradient
        css={`
          stroke-dasharray: ${DASH_ARRAY};
          stroke-dashoffset: ${DASH_ARRAY};
          animation: ${LOOP_DURATION}ms ${ANIM_FUNCTION} infinite
            ${animGradient};
        `}
        style={{
          animationPlayState: done ? 'paused' : 'running',
        }}
      />
      <Outline
        css={`
          stroke-dasharray: ${DASH_ARRAY};
          stroke-dashoffset: ${DASH_ARRAY};
          animation: ${LOOP_DURATION}ms ${ANIM_FUNCTION} infinite ${animMask};
        `}
        style={{
          animationPlayState: done ? 'paused' : 'running',
        }}
      />
      <Outline
        gradient
        css={`
          transition: opacity ${DONE_TRANSITION_DURATION}ms ease-out;
        `}
        style={{ opacity: Number(done) }}
      />
      <defs>
        <linearGradient
          id={GRADIENT_ID}
          x1={6.898}
          y1={75.052}
          x2={143.077}
          y2={75.052}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor={GRADIENT_COLOR_START} />
          <stop offset={1} stopColor={GRADIENT_COLOR_STOP} />
        </linearGradient>
      </defs>
    </svg>
  )
})

AnimatedLogo.propTypes = {
  done: PropTypes.bool,
}

AnimatedLogo.defaultProps = {
  done: false,
}

const Outline = ({ gradient = false, ...props }) => {
  const theme = useTheme()
  return (
    <path
      d={PATH}
      stroke={gradient ? `url(#${GRADIENT_ID})` : theme.border}
      strokeWidth={STROKE_WIDTH}
      {...props}
    />
  )
}
Outline.propTypes = {
  gradient: PropTypes.bool,
}

export default AnimatedLogo
