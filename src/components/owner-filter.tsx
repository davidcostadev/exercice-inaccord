import React, { useState, ChangeEvent, FocusEvent } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--primary30);
  color: #8299b6;
  font-size: 14px;
  padding: 12px 20px;
  z-index: 30;
  position: inherit;

  &:focus {
    outline: none;
  }
`
type DropdownTypes = {
  inAnimation?: boolean
}

const Dropdown = styled.div<DropdownTypes>`
  transition: all 0.4s;
  transform: ${({ inAnimation }) =>
    inAnimation ? 'translateY(0)' : 'translateY(-20px)'};
  opacity: ${({ inAnimation }) => (inAnimation ? 1 : 0)};
  flex-direction: column;
  border-radius: 0 0 4px 4px;
  border: 1px solid var(--primary30);
  border-top-width: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: var(--white);
  z-index: 20;
  position: absolute;
  width: 100%;
`

type MenuTypes = {
  isSelected?: boolean
}

const Name = styled.span`
  font-size: 14px;
  margin-right: 8px;
`

const Role = styled.span`
  font-size: 12px;
`

const Menu = styled.button`
  padding: 8px 20px;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.4s;
  background-color: ${({ isSelected }: MenuTypes) =>
    isSelected ? 'var(--primary100)' : 'var(--white)'};

  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }: MenuTypes) =>
      isSelected ? 'var(--primary100)' : 'var(--primary10)'};
  }

  &:focus {
    outline: none;
  }

  ${Name} {
    transition: background-color 0.4s;
    color: ${({ isSelected }: MenuTypes) =>
      isSelected ? 'var(--white)' : 'var(--text-normal)'};
  }

  ${Role} {
    transition: background-color 0.4s;
    color: ${({ isSelected }: MenuTypes) =>
      isSelected ? 'var(--primary30)' : 'var(--text-secondary)'};
  }
`

const Media = styled.div`
  display: flex;
  margin-right: 2px;
`

const Brand = styled.img`
  width: 24px;
  height: 24px;
`

const Avatar = styled.img`
  transform: translateX(-10px);
  width: 24px;
  height: 24px;
`

const OutSide = styled.div`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`

type WrapperTypes = {
  isOpen?: boolean
}

const Wrapper = styled.div<WrapperTypes>`
  position: relative;
  width: 100%;
  max-width: 270px;

  ${Input} {
    border-radius: ${({ isOpen }) => (isOpen ? '4px 4px 0 0' : '4px')};
  }

  ${OutSide} {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }

  ${Dropdown} {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`
export interface T {
  brandImage: string
  avatarImage: string
  fullName: string
  role: string
  value: string
}

type OwnerFilterProps = {
  items: T[]
  onChange: (item: T) => void
  onCleanValue: () => void
  allowCloseOnBlur?: boolean
}

const OwnerFilter = ({
  items,
  onChange,
  onCleanValue,
  allowCloseOnBlur
}: OwnerFilterProps) => {
  const [search, setSearch] = useState('')
  const [inAnimation, setInAnimation] = useState(true)
  const [isOpen, setIsOpen] = useState(true)

  React.useEffect(() => {
    if (isOpen) {
      setInAnimation(true)
    }
  }, [isOpen])

  const onSelect = (item: T) => {
    setSearch(item.fullName)
    onChange(item)
  }

  const isSelected = (item: T) => search === item.fullName

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const item = items.find((it) => it.fullName === event.target.value)

    if (!item) {
      setSearch('')
      onCleanValue()
    }
  }

  const onClickOutSide = () => {
    if (allowCloseOnBlur) {
      setIsOpen(false)
      setInAnimation(false)
    }
  }

  return (
    <Wrapper isOpen={isOpen}>
      {allowCloseOnBlur && <OutSide onClick={onClickOutSide} />}
      <Input
        placeholder="Filter by name"
        value={search}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Dropdown inAnimation={inAnimation}>
        {items.map((item) => {
          const { value, avatarImage, brandImage, fullName, role } = item
          return (
            <Menu
              key={value}
              onClick={() => onSelect(item)}
              isSelected={isSelected(item)}
            >
              <Media>
                <Brand src={brandImage} />
                <Avatar src={avatarImage} />
              </Media>
              <Name>{fullName}</Name>
              <Role>{role}</Role>
            </Menu>
          )
        })}
      </Dropdown>
    </Wrapper>
  )
}

export default OwnerFilter
