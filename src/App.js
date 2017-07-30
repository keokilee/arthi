import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import List from './components/List.js'

import './App.css';

import { initializeApp } from 'firebase'
const firebase = initializeApp({
  apiKey: "AIzaSyCc6x18hxhn8M8AYK-L6hp00k6mj_mCilM",
  authDomain: "hiart-175222.firebaseapp.com",
  databaseURL: "https://hiart-175222.firebaseio.com",
  projectId: "hiart-175222",
  storageBucket: "hiart-175222.appspot.com",
  messagingSenderId: "209566409721"
})

class App extends Component {

  constructor () {
    super()

    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    const artists = firebase.database().ref('/artists')

    artists.on('value', artists => {
      this.setState({ artists: artists.val() })
    })

  }

  render() {

    const Map = ReactMapboxGl({
      accessToken: 'pk.eyJ1IjoicnVzc2VsbHZlYTIiLCJhIjoiY2lmZzVrNWJkOWV2cnNlbTdza2thcGozNSJ9.zw6CcZLxP6lq0x-xfwp6uA'
    })

    return (
      <div className="App">
        <List
          artists={this.state.artists}
        ></List>
      </div>
    );
  }
}

export default App;
