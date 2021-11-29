import React from "react";
import style from "./UserMenu.module.css"


const UserMenu = (props) => {
    return   <nav className="navigation">
        <div className={style.drop_down}>
            <button> Amit Azoulay <i className={style.arrow}></i></button>
            <ul>
                <li>logout</li>
                <li>My Pod-Space</li>
            </ul>
        </div>
    </nav>
};

export default UserMenu;