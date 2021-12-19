import React, {useEffect, useState} from 'react'
import style from './EditPodcast.module.scss'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import {useLocation, useNavigate} from 'react-router-dom'
import {editPodcast, getPodcast} from '../../services/podcasts'
import CopyRight from '../../components/common/CopyRight/CopyRight'
import DeleteBox from '../../components/edit_podcast/DeleteBox'

const EditPodcast = () => {
  const [podcastDetails, setPodcastDetails] = useState({})
  const [showDelete, setDelete] = useState(false)
  const [isLogged, setLogged] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const id = location.pathname.replace('/podcast/edit-podcast/', '')

  const showDeleteBox = () => {
    if (!showDelete) {
      setDelete(true)
    } else {
      setDelete(false)
    }
  }

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
    if (localStorage.getItem('token')) {
      setLogged('true')
    }
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
            <div>
              {isLogged ? (
                <div className={style.delete} onClick={showDeleteBox}>
                  {showDelete ? <DeleteBox key={id} id={id} /> : null}
                  <span className={style.delete_text}>Delete Podcast</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className={style.params}>
            <label>Title</label>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              type="text"
              name="title"
              value={podcastDetails.title}
            />
            <label>Description</label>
            <textarea
              onKeyDown={handleEnter}
              onChange={handleChange}
              name="description"
              value={podcastDetails.description}
            />
            <label>Html Description</label>
            <textarea
              onKeyDown={handleEnter}
              onChange={handleChange}
              name="htmlDescription"
              value={podcastDetails.htmlDescription}
            />
            <label>Web Url</label>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              type="text"
              name="webUrl"
              value={podcastDetails.webUrl}
            />
            <label>Image Url</label>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              type="text"
              id="imageUrl"
              value={podcastDetails.imageUrl}
            />
            <label>Language</label>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              type="text"
              name="language"
              value={podcastDetails.language}
            />
            <label>Number Of Episodes</label>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              type="number"
              id="numOfEpisodes"
              value={podcastDetails.numberOfEpisodes}
            />
            <label>Avg Episode Length</label>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              type="number"
              name="avgEpisodeLength"
              value={podcastDetails.avgEpisodeLength}
            />
            <label>Author</label>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              type="text"
              name="author"
              value={podcastDetails.author}
            />
            <label>Category</label>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              type="text"
              name="category"
              value={podcastDetails.category}
            />
            <div className={style.action}>
              <button className={style.submit} onClick={savePodcast}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.third_row}>
        <CopyRight />
      </div>
    </div>
  )
}

export default EditPodcast
