import React from 'react'
import PropTypes from 'prop-types'
import { Link, GU, Layout, Split, useTheme } from '@aragon/ui'
import { useSuggestedOrgs } from '../../suggested-orgs'
import Header from '../Header/Header'
import OpenOrg from './OpenOrg'
import Suggestions from './Suggestions'
import WelcomeAction from './WelcomeAction'

import actionCreate from './assets/action-create.png'
import actionOpen from './assets/action-open.png'

const Welcome = React.memo(function Welcome({
  createError,
  onBack,
  onCreate,
  onOpen,
  onOpenOrg,
  openMode,
}) {
  const theme = useTheme()

  const suggestedOrgs = useSuggestedOrgs()

  const primaryContent = 
    <OpenOrg onBack={onBack} onOpenOrg={onOpenOrg}/>

  return (
    <Layout
      breakpoints={{
        medium: 84 * GU,
        large: 112 * GU,
      }}
    >
      <Header
        title="MAO"
        subtitle="Meritocratic Autonomous Organization"
      />

      {
        primaryContent
      }

      <p
        css={`
          padding: ${4 * GU}px 0 ${4 * GU}px;
          text-align: center;
          color: ${theme.contentSecondary};          
        `}
      >
        For more information on MAO{' '}
        <Link href="https://mao.org/" external>
          visit our homepage
        </Link>
      </p>
    </Layout>
  )
})

Welcome.propTypes = {
  createError: PropTypes.array.isRequired,
  onBack: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onOpenOrg: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  openMode: PropTypes.bool.isRequired,
}

function CreateSubtitle({ error }) {
  const theme = useTheme()
  const [errorType, errorData] = error
  if (errorType === 'minimum-balance') {
    return (
      <span
        css={`
          color: ${theme.negative};
        `}
      >
        You need at least {errorData.minimumBalance} {errorData.tokenSymbol} (
        <strong>
          you have {errorData.balance} {errorData.tokenSymbol}
        </strong>
        ).
      </span>
    )
  }
  return 'Start your organization with Aragon'
}

CreateSubtitle.propTypes = {
  error: PropTypes.array.isRequired,
}

export default Welcome
