import React from "react";
import style from "./AddButton.module.css"

const AddButton = () => {
    return <div>
        <button className={style.add_button}>
            <span className={style.add}> Add Podcast </span>
        </button>
    </div>
}

export default AddButton;

