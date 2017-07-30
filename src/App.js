import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import List from './components/List.js'
import Icon from './components/Icon.js'

import './App.css';
import { initializeApp } from 'firebase'
import styled from 'styled-components'

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
      artists: [],
      listToggled: false
    }
  }

  toggleMenu() {
    this.setState({
      listToggled: !this.state.listToggled
    })
  }

  componentDidMount() {
    const artists = firebase.database().ref('/artists')

    artists.once('value', artists => {
      this.setState({ artists: artists.val() })
    })

  }

  render() {

    const Map = ReactMapboxGl({
      accessToken: 'pk.eyJ1IjoicnVzc2VsbHZlYTIiLCJhIjoiY2lmZzVrNWJkOWV2cnNlbTdza2thcGozNSJ9.zw6CcZLxP6lq0x-xfwp6uA'
    })

    return (
      <div className="App">
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={[-158.000072, 21.441922]}
          zoom={[9, 12]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
        >
        </Map>
        <Icon
          onClick={this.toggleMenu.bind(this)}
        ></Icon>
        <List
          active={this.state.listToggled}
          artists={this.state.artists}
        ></List>
      </div>
    );
  }
}

export default App;
