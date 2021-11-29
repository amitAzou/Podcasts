import React, {useEffect, useState} from "react";
import style from "./Search.module.css"
import {searchPodcasts} from "../../../services/podcasts";

const Search = ({setPodcasts}) => {
    const [searchValue, setSearchValue] = useState('')

    useEffect( async()=>{
        try {
            const data = await searchPodcasts(searchValue)
            setPodcasts(data)
        } catch (err)
        {
            console.log(err)
        }
    },[searchValue, setPodcasts])

    return <div className={style.search}>
        <input className={style.searchInput} type="search" placeholder="search a podcast..."
               onChange={(e)=> setSearchValue(e.target.value)}
        />
    </div>

};

export default Search;