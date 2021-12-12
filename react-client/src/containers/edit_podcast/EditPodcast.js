import React, {useEffect, useState} from 'react'
import style from './EditPodcast.module.scss'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import {useLocation, useNavigate} from 'react-router-dom'
import {deletePodcast, editPodcast, getPodcast} from '../../services/podcasts'

const EditPodcast = () => {
  const [podcastDetails, setPodcastDetails] = useState({})
  const navigate = useNavigate()

  const location = useLocation()
  const id = location.pathname.replace('/podcast/edit-podcast/', '')

  const setInitialDetails = async () => {
    try {
      const data = await getPodcast(id)
      setPodcastDetails(data)
    } catch (err) {
      console.error(err)
      setPodcastDetails({})
    }
  }

  useEffect(() => {
    setInitialDetails()
  }, [])

  const handleChange = (event) => {
    const {name, value} = event.target

    setPodcastDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  const savePodcast = async () => {
    try {
      await editPodcast(id, podcastDetails)
      navigate(`/podcast/${id}`)
    } catch (err) {
      console.error(err)
      navigate(`/podcast/edit-podcast/${id}`)
    }
  }

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
    <div className={style.layout}>
      <div className={style.top_row}>
        <SiteLogo />
        <div className={style.title}>Edit Details</div>
        <div className={style.user_menu}>
          <UserMenu />
        </div>
      </div>
      <div className={style.second_row}>
        <div className={style.form_box}>
          <div className={style.pod_info}>
            <button className={style.delete} onClick={deleteCurrent}>
              <span className={style.delete_text}>Delete Podcast</span>
            </button>
            <div className={style.params}>
              <input
                onChange={handleChange}
                type="text"
                name="title"
                placeholder="Title"
              />
              <textarea
                onChange={handleChange}
                name="description"
                placeholder="Description"
              />
              <textarea
                onChange={handleChange}
                name="htmlDescription"
                placeholder="Html Description"
              />
              <input
                onChange={handleChange}
                type="text"
                name="webUrl"
                placeholder="Web Url"
              />
              <input
                onChange={handleChange}
                type="text"
                id="imageUrl"
                placeholder="Image Url"
              />
              <input
                onChange={handleChange}
                type="text"
                name="language"
                placeholder="Language"
              />
              <input
                onChange={handleChange}
                type="number"
                id="numOfEpisodes"
                placeholder="Number Of Episodes"
              />
              <input
                onChange={handleChange}
                type="number"
                name="avgEpisodeLength"
                placeholder="Avg Episode Length"
              />
              <input
                onChange={handleChange}
                type="text"
                name="author"
                placeholder="Author"
              />
              <input
                onChange={handleChange}
                type="text"
                name="category"
                placeholder="Category"
              />
              <div className={style.action}>
                <button className={style.submit} onClick={savePodcast}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPodcast
