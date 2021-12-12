import React, {useState} from 'react'
import style from './AddPodcast.module.scss'
import SiteLogo from '../../components/common/SiteLogo/SiteLogo'
import UserMenu from '../../components/common/UserMenu/UserMenu'
import {addPodcast} from '../../services/podcasts'
import {useNavigate} from 'react-router-dom'

const AddPodcast = () => {
  const [podcast, setPodcast] = useState({})
  const navigate = useNavigate()

  const handleChange = (event) => {
    const {name, value} = event.target

    setPodcast((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  const savePodcast = async () => {
    try {
      await addPodcast(podcast)
      navigate(`/podcast`)
    } catch (err) {
      console.log(err)
      navigate(`/podcast/add/`)
    }
  }

  return (
    <div className={style.layout}>
      <div className={style.top_row}>
        <SiteLogo />
        <div className={style.title}>Add Podcast</div>
        <div className={style.user_menu}>
          <UserMenu />
        </div>
      </div>
      <div className={style.second_row}>
        <div className={style.add_box}>
          <div className={style.params}>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Title"
              name="title"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Description"
              name="description"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Html Description"
              name="htmlDescription"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Web Url"
              name="webUrl"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Image Url"
              name="imageUrl"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Language"
              name="language"
            />
            <input
              onChange={handleChange}
              type="number"
              placeholder="Number Of Episodes"
              name="numberOfEpisodes"
            />
            <input
              onChange={handleChange}
              type="number"
              placeholder="Avg Episode Length"
              name="avgEpisodeLength"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Author"
              name="author"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Category"
              name="category"
            />
          </div>
          <div className={style.submit}>
            <button onClick={savePodcast}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPodcast
