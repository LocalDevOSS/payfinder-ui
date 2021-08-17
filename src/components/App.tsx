import React from 'react'
import '../styles/App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './landing'
import Search from './search'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <Landing />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
