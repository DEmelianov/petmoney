import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './TopNav.module.scss'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

export default function TopNav() {
  const menuLinks = [
    {link: '/accounts', label: 'Счета'},
    {link: '/categories', label: 'Категории'},
    {link: '/transactions', label: 'Транзакции'},
    {link: '/auth', label: 'Авторизация'},
    {link: '/profile', label: 'Профиль'},
  ]

  return (
    <nav className={cn('topNav')}>
      {menuLinks.map(link =>
        (
          <NavLink
            to={link.link}
            key={link.link}
            className={({isActive}) => cn('item', {'active': isActive})}
          >
            {link.label}
          </NavLink>
        )
      )}
    </nav>
  )
}