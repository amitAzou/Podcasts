import React, {useEffect, useState} from 'react'
import style from './Search.module.scss'
import Proptypes from 'prop-types'
import {searchPodcasts} from '../../../services/podcasts'

const Search = ({setPodcasts}) => {
  const [searchValue, setSearchValue] = useState('')

  async function search(searchValue) {
    try {
      const data = await searchPodcasts(searchValue)
      setPodcasts(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(async () => {
    search(searchValue)
  }, [searchValue, setPodcasts])

  return (
    <div className={style.search}>
      <input
        className={style.searchInput}
        type="search"
        placeholder="search a podcast..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}

Search.defaultProps = {
  setPodcasts: () => {},
}

Search.propTypes = {
  setPodcasts: Proptypes.func,
}
export default Search
