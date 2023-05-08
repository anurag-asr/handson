import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";
import { Card, Col, Row } from 'antd';
import Link from 'antd/es/typography/Link';
import Meta from 'antd/es/card/Meta';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

export const MOVIESBYID_QUERY = gql`
query MovieByid($id:ID!){
  movie(id:$id){
    message
    data{
      id
      title
      originalTitle
      status
      streamingOn

    }
  }
}
`;

const SingleMovieDetails = () => {
    const [dataSource,setDataSource] = useState();
    const {id}=useParams();
    const {data} = useQuery(MOVIESBYID_QUERY,{
        variables:{
            id:`${id}`
        }
    });

    const singleMovieData = data?.movie?.data 

    useEffect(()=>{
       if(data){
        setDataSource(singleMovieData)
       }
    },[data])




  return (
    <div>
     <Row gutter={[16, 16]}>
        {dataSource && (
          <div> 
             <div>Carousel Space</div>
             <Col span={16} key={dataSource.id}>
              <Link to={`/favourite/${dataSource.id}`}>
                <Card
                  hoverable
                  size="small"
                  title={`${dataSource.title}`}
                  extra={<a href={`detailsmovie/:${dataSource.id}`}>Details</a>}
                 
                  
                  cover={
                    <img
                      alt="example"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGb56xEqrOH5PIAa5EQqJvrYa1OcEplrdQjA&usqp=CAU"
                    />
                  }

                 
                >
                  <Meta
                    title="Europe Street beat"
                    description={`Language:${dataSource.originalLanguage} | Budget:$${dataSource.budget}`}
                  />
                </Card>
              </Link>
            </Col>
          </div>
        )
            
           
         
          }
      </Row>
    </div>
  )
}

export default SingleMovieDetails
