import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './TopNav.module.scss'

export default function TopNav() {
  const menuLinks = [
    {link: '/accounts', label: 'Счета'},
    {link: '/categories', label: 'Категории'},
    {link: '/transactions', label: 'Транзакции'},
    {link: '/auth', label: 'Авторизация'},
    {link: '/profile', label: 'Профиль'},
  ]

  return (
    <nav className={styles.topNav}>
      {menuLinks.map(link =>
        (
          <NavLink
            to={link.link}
            key={link.link}
            className={({ isActive }) =>
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            {link.label}
          </NavLink>
        )
      )}
    </nav>
  )
}