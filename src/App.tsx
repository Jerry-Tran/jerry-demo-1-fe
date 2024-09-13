import { useState } from 'react'
import { Button, DatePicker } from 'antd'
function App() {
  return (
    <>
      <Button type='primary'>PRESS ME</Button>
      <DatePicker placeholder='select date' />
    </>
  )
}

export default App
