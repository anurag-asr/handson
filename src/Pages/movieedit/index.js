import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export const MOVIE_UPDATE_QUERY = gql`
mutation MovieUpdating($id:ID!,$data:UpdateMovieInput!){
updateMovie(id:$id,data:$data){
 message
 data{
 posterData
 collections
  credits
  genres
} 
}
}
`

export const MOVIE_QUERY_BY_ID = gql`
query MovieByid($id:ID!){
  movie(id:$id){
    message
    data{
      id 
      adult
      budget
      originalLanguage
      originalTitle
      title
      overview
      releaseDate
      revenue
      runtime
      status
      tagline
    }
  }
}
`

const MovieEdit = () => {
  const {id} = useParams();
  const [dataById,setDataById] = useState()

  const onFinish = (values) => {
    updateMovie()
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
 
  

  const [updateMovie] = useMutation(MOVIE_UPDATE_QUERY,{
   fetchPolicy: 'network-only',
   onCompleted(res){
    console.log(res)
    // setLoading(false)
   },
   onError(){}
  })

  const {loading, error, data} = useQuery(MOVIE_QUERY_BY_ID,{
    variables:{
      id:id
    }
  })


  useEffect(() => {
    updateMovie({
      variables:{
        id:id,
        data:{
          adult: true,
          budget: 100000,
          originalLanguage:"English",
          originalTitle: "Trival",
          title: "T HIndustam Times",
          overview: "Toerssss",
          releaseDate: "2023-03-28T07:39:16.471Z",
          revenue: 231213,
          runtime: 121,
          status: "Relesed",
          tagline: "The tiger zidna tha  hai",
          countryIds: [],
          languageIds: []
        }
    }
    })

    if(data){
      setDataById(data.movie.data)
    }
  },[data])


  if(loading) {
    return '....Loading....'
  }

  console.log(dataById)
  return (
    <div className="movie_edit">
      {
        dataById && (
          <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={dataById}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input  value= {dataById.title} name="title" onChange={(e)=>{
              setDataById({...dataById,[e.target.name]:e.target.value})
            }}/>
          </Form.Item>

          <Form.Item
            label="Original Title"
            name="originalTitle"
          >
            <Input  value= {dataById.originalTitle} name="originalTitle" onChange={(e)=>{
              setDataById({...dataById,[e.target.name]:e.target.value})
            }}/>
          </Form.Item>

          <Form.Item
            label=" Status"
            name="status"
          >
            <Input  value= {dataById.status} name="status" onChange={(e)=>{
              setDataById({...dataById,[e.target.name]:e.target.value})
            }}/>
          </Form.Item>

          <Form.Item
            label="Language"
            name="originalLanguage"
          >
            <Input  value= {dataById.originalLanguage} name="originalLanguage" onChange={(e)=>{
              setDataById({...dataById,[e.target.name]:e.target.value})
            }}/>
          </Form.Item>

          <Form.Item
            label="Budget"
            name="budget"
          >
            <Input  value= {dataById.budget} name="budget" onChange={(e)=>{
              setDataById({...dataById,[e.target.name]:e.target.value})
            }}/>
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
        )
      }
     
    </div>
  );
};

export default MovieEdit;
