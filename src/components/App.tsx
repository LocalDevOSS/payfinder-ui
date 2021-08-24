import React from 'react'
import '../styles/App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './landing'
import Register from './register'
import Search from './search'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/search' component={Search} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
