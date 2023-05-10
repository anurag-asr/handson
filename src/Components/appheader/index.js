import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect} from "react";
import { AUTH_TOKEN } from "../../pages/Constants";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const logincheck=localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate()

  useEffect(()=>{

  })
  
  return (
    <div className="AppHeader">
      <div className="title_tag">TMDB</div>
      <div className="otherInfo_div">
        <ul className="otherInfo">
          <li><a href="/"><HomeOutlined className="home_icon"/>DashBoard</a></li>
          <li><a href="/person">Person</a></li>
          <li><a href="/movies">Movies</a></li>
          {
            logincheck ? <li style={{
              
            }} onClick={()=>{
              localStorage.setItem(AUTH_TOKEN,"")
              navigate("/")
            }}><UserOutlined />Logout</li> : <li><UserOutlined />Login</li>
          }
        </ul>
      </div>
    </div>
  );
};

export default AppHeader;
