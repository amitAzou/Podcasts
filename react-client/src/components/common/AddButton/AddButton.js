import React from 'react'
import style from './AddButton.module.scss'
import Proptypes from 'prop-types'

const AddButton = ({text}) => {
  return (
    <div>
      <button className={style.add_button}>
        <span className={style.text}>{text}</span>
      </button>
    </div>
  )
}

AddButton.propTypes = {
  text: Proptypes.string,
}

export default AddButton
