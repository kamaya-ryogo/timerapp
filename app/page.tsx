import React from 'react'
import TimerApp from '../components/TimerApp'

const IndexPage = () => {
  return (
    <main>
      <h1>Timer by Kamaya</h1>
      <TimerApp hours={1} minutes={0} seconds={0} />
    </main>
  )
}

export default IndexPage
