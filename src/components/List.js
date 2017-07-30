import React from 'react'

export default (props) => {
  if(!props) {
    return ''
  }
  console.log(props.artists)
  return (
    <ul>
     {props.artists.forEach(({first_name, last_name}) =>
       <li>{first_name} { last_name }</li>
     )}
    </ul>
  )
}
