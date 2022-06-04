import React from 'react'
import './App.css';
import './index.css'
import Popular from './components/Popular';

class App extends React.Component{
  render(){
    return(
      <div className='container'>
        <Popular />
      </div>
    )
  }
}

export default App;