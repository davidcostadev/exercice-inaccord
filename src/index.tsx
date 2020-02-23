import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { GlobalStyle } from './global-style'
import OwnerFilter, { T as IOwner } from './components/owner-filter'
import Menu, { T as TMenuItem } from './components/menu'
import Brand from './static/brand.png'
import Img1 from './static/avatar-01.png'
import Img2 from './static/avatar-02.png'
import Img3 from './static/avatar-03.png'
import Img4 from './static/avatar-04.png'

console.info(`⚛️ ${React.version}`)

const ownerOptions = [
  {
    brandImage: Brand,
    avatarImage: Img1,
    fullName: 'Ross Rich',
    role: 'Manager',
    value: '1'
  },
  {
    brandImage: Brand,
    avatarImage: Img2,
    fullName: 'Harry Avery',
    role: 'Associate',
    value: '2'
  },
  {
    brandImage: Brand,
    avatarImage: Img3,
    fullName: 'Amit Patel',
    role: 'Associate',
    value: '3'
  },
  {
    brandImage: Brand,
    avatarImage: Img4,
    fullName: 'Suzy Anderson',
    role: 'Associate',
    value: '4'
  }
]

const menu = [
  {
    label: 'My evaluations',
    value: 'my-evaluations'
  },
  {
    label: 'My steps',
    value: 'my-steps'
  }
]

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const Middle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 15px;
  padding-right: 15px;
`

const Output = styled.div`
  font-family: monospace;
  background-color: #212121;
  color: #eeeeee;
  padding: 16px 12px;
  min-height: 100px;
  font-size: 10px;
`

export interface OnChangeTypes {
  value: string | number
  label: string
}

const App = () => {
  const [OwnerFilterValue, setOwnerFilterValue] = useState<null | IOwner>(null)
  const [currentMenu, setCurrentMenu] = useState('my-steps')

  const onMenuChange = (item: TMenuItem) => {
    setCurrentMenu(item.value)
  }

  const onChange = (item: IOwner) => {
    setOwnerFilterValue(item)
  }

  const onCleanValue = () => {
    setOwnerFilterValue(null)
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Middle>
          <Menu
            items={menu}
            onChange={onMenuChange}
            currentMenu={currentMenu}
          />
          <OwnerFilter
            items={ownerOptions}
            onChange={onChange}
            onCleanValue={onCleanValue}
          />
        </Middle>
        <Output>
          <p>currentMenu: {JSON.stringify(currentMenu)}</p>
          <p>OwnerFilterValue: {JSON.stringify(OwnerFilterValue)}</p>
        </Output>
      </Container>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

module.hot && module.hot.accept()
