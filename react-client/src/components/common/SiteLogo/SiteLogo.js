import React from "react";
import style from "SiteLogo.module.css"

const SiteLogo = (props) => {
    return <div className={style.card_cont}>
        <img src={props.imageUrl} alt={'img'}/>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
    </div>

};

export default SiteLogo;