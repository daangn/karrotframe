import React from 'react'
import { Route, useHistory } from 'react-router-dom'

import { useNavigator } from 'karrotframe'
import styled from '@emotion/styled'

const Page3: React.FC = () => {
  const history = useHistory()
  const navigator = useNavigator()

  const onPopClick = () => {
    navigator.pop(2).send({ wow: 'wowowow!' })
  }
  const onPop = () => {
    navigator.pop(1)
  }
  const onNext = () => {
    navigator.push('/page2')
  }
  const startForm = () => {
    history.push('/page3/inside1')
  }
  const goBack = () => {
    history.goBack()
  }
  const goBack2 = () => {
    history.go(-4)
  }

  return (
    <Container>
      <button onClick={onPopClick}>이전 페이지로</button>
      <button onClick={onPop}>pop</button>
      <button onClick={startForm}>start</button>
      <Route path="/page3/inside1">
        <div>inside1</div>
        <button onClick={goBack}>goBack</button>
      </Route>
      <Route path="/page3/inside2">
        <div>inside2</div>
        <button onClick={goBack}>goBack</button>
        <button onClick={goBack2}>goback x 4</button>
        <button onClick={onPopClick}>이전 페이지로</button>
        <button onClick={onNext}>다음 페이지로</button>
      </Route>
    </Container>
  )
}

const Container = styled.div``

export default Page3
