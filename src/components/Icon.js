import React from 'react'
import styled from 'styled-components';
import Hamburger from 'react-icons/lib/md/menu';

const Icon = styled.a`
  position: fixed;
  top: 25px;
  right: 25px;
`
export default () => {
  return (
    <Icon>
      <Hamburger></Hamburger>
    </Icon>
  )
}
