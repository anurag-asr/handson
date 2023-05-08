import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { gql, useMutation } from '@apollo/client';


export const ADD_MOVIE_QUERY = gql`
mutation AddMovie($data:MovieInput){
  createMovie(data:$data){
    message
    data{
      companies
      genres
      credits
      backdropData
    }
  }
}
`

const AddMovie = () => {
  const [movie,setMovie] = useState({
    adult:Boolean(),budget:"",originalLanguage:"",title:"",overview:"",releaseDate:"023-04-03T12:48:48.042Z",
    revenue:"",runtime:"",status:"",tagline:"",countryIds:[],languageIds:[]
  })
  const [addmovie] = useMutation(ADD_MOVIE_QUERY,{
    variables:{
      data:  {
      "adult":movie.adult,
      "budget":movie.budget,
      "originalLanguage":movie.originalLanguage,
      "originalTitle":movie.originalTitle,
      "title":movie.title,
      "overview":movie.overview,
      "releaseDate": "2023-04-03T12:48:48.042Z",
      "revenue":movie.revenue,
      "runtime":142,
      "status":movie.status,
      "tagline":movie.tagline,
      "countryIds": [],
      "languageIds":[]
    } 
  }
  })

  const onFinish = (values) => {
    addmovie()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div className='addmovie'>
      <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
 
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Adult"
      name="adult"
      value={movie.adult}
      onChange={(e)=>{ setMovie({ ...movie, adult: Boolean(e.target.value) });}}
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Budget"
      name="budget"
      value={movie.budget}
      onChange={(e)=>{ setMovie({ ...movie, budget: Number(e.target.value) });}}
      rules={[
        {
          required: true,
          message: 'Please input your Budget!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="OriginalLanguage"
      name="originalLanguage"
      value={movie.originalLanguage}
      onChange={(e)=>{ setMovie({ ...movie, originalLanguage: e.target.value });}}
      rules={[
        {
          required: true,
          message: 'Please input your originalLanguage!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="Title"
      name="title"
      value={movie.title}
      onChange={(e)=>{ setMovie({ ...movie, title: e.target.value });}}
      rules={[
        {
          required: true,
          message: 'Please input your title!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Overview"
      name="overview"
      value={movie.overview}
      onChange={(e)=>{ setMovie({ ...movie, overview: e.target.value });}}
      rules={[
        {
          required: true,
          message: 'Please input your overview!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Revenue"
      name="revenue"
      value={movie.revenue}
      onChange={(e)=>{ setMovie({ ...movie, revenue:Number(e.target.value)});}}
      rules={[
        {
          required: true,
          message: 'Please input your revenue!',
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
          message: 'Please input your releaseDate!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="runtime"
      name="runtime"
      value={movie.runtime}
      onChange={(e)=>{ setMovie({ ...movie, runtime: Number(e.target.value) });}}
      rules={[
        {
          required: true,
          message: 'Please input your runtime!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  

    <Form.Item
      label="OriginalTitle"
      name="originalTitle"
      value={movie.originalTitle}
      onChange={(e)=>{ setMovie({ ...movie, originalTitle: e.target.value });}}
      rules={[
        {
          required: true,
          message: 'Please input your originalTitle!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="tagline"
      name="tagline"
      value={movie.tagline}
      onChange={(e)=>{ setMovie({ ...movie, tagline: e.target.value });}}
      rules={[
        {
          required: true,
          message: 'Please input your tagline!',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      label="Status"
      name="status"
      value={movie.tagline}
      onChange={(e)=>{ setMovie({ ...movie, status: e.target.value });}}
      rules={[
        {
          required: true,
          message: 'Please input your status!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    

    <Form.Item
      name="remember"
      valuePropName="checked"
      value={movie.remember}
      onChange={(e)=>{ setMovie({ ...movie, remember: e.target.value });}}
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default AddMovie
