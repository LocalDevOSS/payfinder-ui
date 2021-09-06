import React from 'react'
import { isMobile } from 'react-device-detect'
import '../styles/App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './landing'
import Register from './register'
import SearchResultMobile from './search/mobile'
import SearchResultPc from './search/pc'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/search' component={isMobile ? SearchResultMobile : SearchResultPc} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
