import React from 'react'
import styled from 'styled-components'



const Li = styled.li`
  color: red;
`
// props
// aritsts, active
export default ({artists, active}) => {

  const Ul = styled.ul`
    list-style-type: none;
    position: fixed;
    right: 0;
    top: 0;
    transform: translateX(${active ? '0' : '100%'});
    transition: transform 0.3s ease;
  `
  const list = artists.map(({first_name, last_name}) => {
    return <Li>{ first_name } { last_name }</Li>
  })

  return (
    <Ul>
      { list }
    </Ul>
  )
}
