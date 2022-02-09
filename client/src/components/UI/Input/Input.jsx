import React, {memo} from 'react'
import styles from './Input.module.scss'

const InputText = ({type = 'text', name, id, onChange, value, label, ...args}) => {
  return (
    <>
      {label && <label className={styles.label} htmlFor={id}>{label}</label>}
      <input
        className={`${styles.input}`}
        key={id}
        name={name}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        {...args}
      />
      {console.log('render input', name)}
    </>
  )
}

export default InputText