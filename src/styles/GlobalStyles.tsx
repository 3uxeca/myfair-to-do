'use client'
import { css, Global } from '@emotion/react'
import React from 'react'

type Props = {}

export const GlobalStyle = css`
  body {
    background-color: #f6f6f6;
    margin: 0;
    padding: 0;
  }
`;

const GlobalStyles = (props: Props) => {
  return (
    <Global styles={GlobalStyle} />
  )
}

export default GlobalStyles