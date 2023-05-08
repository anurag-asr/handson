import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

export const FEATURED_MOVIES_QUERY = gql`
  query MovieList($sort: ListMoviesSort!, $filter: MoviesFilter!) {
    movies(sort: $sort, filter: $filter) {
      message
      count
      data {
        title
        id
        adult
        budget
        originalLanguage
        budget
      }
    }
  }
`

const MovieListing = () => {
  const [dataSource,setDataSource] = useState()
  const { data } = useQuery(FEATURED_MOVIES_QUERY, {
    variables: {
      sort: {
        field: "createdAt",
        order: "DESC",
      },
      filter: {},
    },
  });

  const movieData = data?.movies?.data;

  useEffect(()=>{
   if(data){
    setDataSource(movieData)
   }
  },[data])
 
  const deletemovieByid=(id)=>{
    setDataSource((pre)=>{
      return pre.filter((elem)=>elem.id!==id)
    })
  }
  
  // console.log(dataSource)

  return (
    <div>
      <div className="movie_page_btn"><Link to="/addmovie"><Button>Add Movie</Button></Link></div>
      <div className="home_page">
      <Row gutter={[16, 16]}>
        {dataSource &&
          dataSource.map((elem) => (
            <Col span={8} key={elem.id}>
              {/* <Link to={`/favourite/${elem.id}`}> */}
                <Card
                  hoverable
                  size="small"
                  title={`${elem.title}`}
                  extra={<a href={`detailsmovie/:${elem.id}`}>Details</a>}
                  
                  cover={
                    <img
                      alt="example"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGb56xEqrOH5PIAa5EQqJvrYa1OcEplrdQjA&usqp=CAU"
                    />
                  }
                  actions={[
                    <a href={`/movie_edit/${elem.id}`}><EditOutlined    key="edit" /></a>
                    ,
                    <DeleteOutlined key="setting" onClick={()=>{deletemovieByid(elem.id)}}/>,
                  
                    // <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    title="Europe Street beat"
                    description={`Language:${elem.originalLanguage} | Budget:$${elem.budget}`}
                  />
                </Card>
              {/* </Link> */}
            </Col>
          ))}
      </Row>
    </div>
    </div>
    
  );
};

export default MovieListing;
