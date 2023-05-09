import React from "react";
import { Button,Form, Input } from "antd";
import {useState} from "react"
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_MOVIE_QUERY, MOVIE_UPDATE_QUERY } from "../graphQl/movieform";

const FormTable = ({id,dataById}) => {
    const navigate = useNavigate()
  const [movie, setMovie] = useState({
    adult: Boolean(),
    budget: dataById?.budget || "" ,
    originalLanguage: dataById?.originalLanguage || "",
    title: dataById?.title || "",
    overview: dataById?.overview || "",
    releaseDate: "023-04-03T12:48:48.042Z",
    revenue: dataById?.revenue || "",
    runtime: dataById?.runtime || "",
    status: dataById?.status || "",
    tagline: dataById?.tagline || "",
    countryIds: [],
    languageIds: [],
    originalTitle: dataById?.originalTitle || "",
  });

  const newData = {
    "adult":movie?.adult,
    "budget":movie?.budget,
    "originalLanguage":movie?.originalLanguage,
    "originalTitle":movie?.originalTitle,
    "title":movie?.title,
    "overview":movie?.overview,
    "releaseDate": "2023-04-03T12:48:48.042Z",
    "revenue":movie?.revenue,
    "runtime":movie?.runtime,
    "status":movie?.status,
    "tagline":movie?.tagline,
    "countryIds": [],
    "languageIds":[]
  } 

   const [addmovie] = useMutation(ADD_MOVIE_QUERY,{
    variables:{
      data: newData
  }
  })

  
  const [editmovie] = useMutation(MOVIE_UPDATE_QUERY,{
    fetchPolicy: 'network-only',
    variables:{
     id:id,
     data:newData
    },
    onCompleted(res){
     console.log(res)
    },
    onError(){}
   })

  const onFinish = (values) => {
    id ? editmovie() : addmovie() 
    navigate("/movies")
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

 console.log("movie",movie)
 console.log("editdata",newData)


  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={movie}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Adult"
          name="adult"
          value={movie.adult}
          onChange={(e) => {
            setMovie({ ...movie, adult: Boolean(e.target.value) });
          }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Budget"
          name="budget"
          value={movie.budget}
          onChange={(e) => {
            setMovie({ ...movie, budget: Number(e.target.value) });
          }}
          rules={[
            {
              required: true,
              message: "Please input your Budget!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="OriginalLanguage"
          name="originalLanguage"
          value={movie.originalLanguage}
          onChange={(e) => {
            setMovie({ ...movie, originalLanguage: e.target.value });
          }}
          rules={[
            {
              required: true,
              message: "Please input your originalLanguage!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          value={movie.title}
          onChange={(e) => {
            setMovie({ ...movie, title: e.target.value });
          }}
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Overview"
          name="overview"
          value={movie.overview}
          onChange={(e) => {
            setMovie({ ...movie, overview: e.target.value });
          }}
          rules={[
            {
              required: true,
              message: "Please input your overview!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Revenue"
          name="revenue"
          value={movie.revenue}
          onChange={(e) => {
            setMovie({ ...movie, revenue: Number(e.target.value) });
          }}
          rules={[
            {
              required: true,
              message: "Please input your revenue!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="ReleaseDate"
          name="releaseDate"
          // value="2023-04-03T12:48:48.042Z"
          // onChange={(e)=>{ setMovie({ ...movie, releaseDate: e.target.value });}}

          rules={[
            {
              required: true,
              message: "Please input your releaseDate!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="runtime"
          name="runtime"
          value={movie.runtime}
          onChange={(e) => {
            setMovie({ ...movie, runtime: Number(e.target.value) });
          }}
          rules={[
            {
              required: true,
              message: "Please input your runtime!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="OriginalTitle"
          name="originalTitle"
          value={movie.originalTitle}
          onChange={(e) => {
            setMovie({ ...movie, originalTitle: e.target.value });
          }}
          rules={[
            {
              required: true,
              message: "Please input your originalTitle!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="tagline"
          name="tagline"
          value={movie.tagline}
          onChange={(e) => {
            setMovie({ ...movie, tagline: e.target.value });
          }}
          rules={[
            {
              required: true,
              message: "Please input your tagline!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          value={movie.tagline}
          onChange={(e) => {
            setMovie({ ...movie, status: e.target.value });
          }}
          rules={[
            {
              required: true,
              message: "Please input your status!",
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {
                id ? "Edit" : "Add"
            }
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTable;
