import React from 'react'
import { useHistory } from 'react-router-dom'

import styled from '@emotion/styled'
import { ScreenHelmet, useQueryParams } from '@karrotframe/navigator'

const PageUseQueryParams: React.FC = () => {
  const history = useHistory()
  const { hello } = useQueryParams<{ hello: 'world' }>({
    ignoreNestedRoutes: false,
  })

  return (
    <Container>
      <ScreenHelmet title="useQueryParams" />
      hello: {hello}
      <button
        onClick={() => {
          history.push('/useQueryParams?hello=somethingotherworld')
        }}
      >
        change hello
      </button>
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
`

export default PageUseQueryParams
