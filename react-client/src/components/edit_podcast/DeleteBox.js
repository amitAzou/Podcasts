import style from './DeleteBox.module.scss'
import React from 'react'
import {deletePodcast} from '../../services/podcasts'
import {useNavigate} from 'react-router-dom'
import Proptypes from 'prop-types'

const DeleteBox = ({id}) => {
  const navigate = useNavigate()

  const deleteCurrent = async () => {
    try {
      await deletePodcast(id)
      navigate('/podcast')
    } catch (err) {
      navigate(`/podcast/edit-podcast/${id}`)
      console.error(err)
    }
  }

  return (
    <div className={style.delete_box}>
      <p>Are You Sure ?</p>
      <div className={style.delete_box_buttons}>
        <button onClick={deleteCurrent}>Yes</button>
        <button>No</button>
      </div>
    </div>
  )
}

DeleteBox.propTypes = {
  id: Proptypes.number,
}

export default DeleteBox
