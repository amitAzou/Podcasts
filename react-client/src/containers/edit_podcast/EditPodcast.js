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

  const handleEnter = async (event) => {
    if (event.key === 'Enter') {
      await savePodcast()
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
                onKeyDown={handleEnter}
                onChange={handleChange}
                type="text"
                name="title"
                placeholder="Title"
              />
              <textarea
                onKeyDown={handleEnter}
                onChange={handleChange}
                name="description"
                placeholder="Description"
              />
              <textarea
                onKeyDown={handleEnter}
                onChange={handleChange}
                name="htmlDescription"
                placeholder="Html Description"
              />
              <input
                onKeyDown={handleEnter}
                onChange={handleChange}
                type="text"
                name="webUrl"
                placeholder="Web Url"
              />
              <input
                onKeyDown={handleEnter}
                onChange={handleChange}
                type="text"
                id="imageUrl"
                placeholder="Image Url"
              />
              <input
                onKeyDown={handleEnter}
                onChange={handleChange}
                type="text"
                name="language"
                placeholder="Language"
              />
              <input
                onKeyDown={handleEnter}
                onChange={handleChange}
                type="number"
                id="numOfEpisodes"
                placeholder="Number Of Episodes"
              />
              <input
                onKeyDown={handleEnter}
                onChange={handleChange}
                type="number"
                name="avgEpisodeLength"
                placeholder="Avg Episode Length"
              />
              <input
                onKeyDown={handleEnter}
                onChange={handleChange}
                type="text"
                name="author"
                placeholder="Author"
              />
              <input
                onKeyDown={handleEnter}
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
