import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../common/constant";


const AppHeader = () => {
  const logincheck=localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate()
  
  return (
    <div className="AppHeader">
      
      <div className="title_tag">TMDB</div>
      <div className="otherInfo_div">
        <ul className="otherInfo">
          
          <li> <Link to ="/"><HomeOutlined className="home_icon"/>Dashboard</Link></li>
          <li> <Link to ="/person">Person</Link></li>
          <li> <Link to ="/movies">Movies</Link></li>
          {
            logincheck ? <li style={{
              cursor:"pointer"
            }} onClick={()=>{
              localStorage.setItem(AUTH_TOKEN,"")
              navigate("/")
            }}>< UserOutlined />Logout</li> : <li><UserOutlined />Login</li>
          }
        </ul>
      </div>
    </div>
  );
};

export default AppHeader;
