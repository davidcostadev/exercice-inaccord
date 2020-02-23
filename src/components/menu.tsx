import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.ul`
  background-color: var(--white);
  border: 1px solid var(--primary30);
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

const Item = styled.li`
  list-style: none;
  display: inline-flex;
`

type ButtonTypes = {
  isActive?: boolean
}

const Button = styled.button<ButtonTypes>`
  flex: 1;
  text-align: left;
  padding: 8px 20px;
  align-items: center;
  transition: background-color 0.4s;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary100)' : 'var(--white)'};
  color: ${({ isActive }) =>
    isActive ? 'var(--white)' : 'var(--text-normal)'};

  cursor: pointer;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--primary100)' : 'var(--primary10)'};
  }

  &:focus {
    outline: none;
  }
`

export interface T {
  value: string
  label: string
}

type MenuTypes = {
  items: T[]
  onChange: (item: T) => void
  currentMenu: string
}

const Menu = ({ items, currentMenu, onChange }: MenuTypes) => {
  const isActive = (value: string) => value === currentMenu

  return (
    <Wrapper>
      {items.map((item) => (
        <Item key={item.value}>
          <Button
            type="button"
            onClick={() => onChange(item)}
            isActive={isActive(item.value)}
          >
            {item.label}
          </Button>
        </Item>
      ))}
    </Wrapper>
  )
}

export default Menu
