import React from 'react'
import styled from '@emotion/styled'
import { ScreenHelmet, useParams } from 'karrotframe'

const PageUseParams: React.FC = () => {
  const { param } = useParams<{ param: string }>()

  return (
    <Container>
      <ScreenHelmet title="useParams" />
      param: {param}
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
`

export default PageUseParams
