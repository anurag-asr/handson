import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { AUTH_TOKEN } from "../../Pages/Constants";

const AppHeader = () => {
  const logincheck=localStorage.getItem(AUTH_TOKEN)
  
  return (
    <div className="AppHeader">
      <div className="title_tag">TMDB</div>
      <div className="otherInfo_div">
        <ul className="otherInfo">
          <li><a href="/"><HomeOutlined className="home_icon"/>Home</a></li>
          <li><a href="/favourite">FavouriteMovie</a></li>
          <li><a href="/person">Person</a></li>
          <li><a href="/movies">Movies</a></li>
          {
            logincheck ? <li onClick={()=>{
              localStorage.setItem(AUTH_TOKEN,"")}}><UserOutlined />Logout</li> : <li><a href="/login"><UserOutlined />Login</a></li>
          }
        </ul>
      </div>
    </div>
  );
};

export default AppHeader;
