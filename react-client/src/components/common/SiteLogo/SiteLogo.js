import React from "react";
import style from "./SiteLogo.module.css"
import logo from "../../../images/site_logo_main.png"

const SiteLogo = (props) => {
  return  <div>
        <img src={logo} className={style.site_logo}/>
    </div>
};

export default SiteLogo;