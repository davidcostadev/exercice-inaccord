import { createGlobalStyle } from 'styled-components'
import { FontWeights, Colors } from './lib/style-guide'

export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');

  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }

  :root {
    --white: #ffffff;
    --text-normal: #192533;
    --text-placeholder: #8299B6;
    --text-secondary: #60789A;
    --primary10: #F5F9FF;
    --primary20: #DEECFC;
    --primary30: #D1E3F8;
    --primary100: #3284E1;
  }

  ::placeholder {
    color: var(--text-placeholder);
  }
  ::-webkit-input-placeholder {
    color: var(--text-placeholder);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-style: normal;
  }

  body, input {
    font-weight: ${FontWeights.PR};
    font-size: 14px;
    line-height: 1.4rem;
    color: ${Colors.TX1};
  }

  svg, img {
    display: block;
  }

  #root {
    display: flex;
    min-height: 100vh;
    background: ${Colors.BG3};
  }
`
