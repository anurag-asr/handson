import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";
import { Card, Col, Image, Row } from 'antd';
import Link from 'antd/es/typography/Link';
import Meta from 'antd/es/card/Meta';
import { Carousel } from 'antd';

// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const contentStyle = {
  margin: 0,
  height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

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

    const onChange = (currentSlide) => {
      console.log(currentSlide);
    };

    useEffect(()=>{
       if(data){
        setDataSource(singleMovieData)
       }
    },[data])
   

  console.log(data)

  return (
    <div className='singlemoviedetails'>
      <div >
      <Carousel autoplay afterChange={onChange} effect="fade">
      <div>
        <Image style={contentStyle} width="100%"  src="https://thumbs.dreamstime.com/b/sunset-sunrise-landscape-panorama-beautiful-nature-beach-colorful-red-orange-purple-clouds-reflected-ocean-49632998.jpg" />
      </div>
      <div>
        <Image style={contentStyle} width="100%"  src="https://thumbs.dreamstime.com/b/travel-boat-thailand-island-beach-tropical-coast-asia-landsc-landscape-background-32070946.jpg" />
      </div>
      <div>
        <Image style={contentStyle} width="100%"  src="https://thumbs.dreamstime.com/b/nature-panorama-mountain-landscape-sunset-norway-44518447.jpg" />
      </div>
      <div>
        <Image style={contentStyle} width="100%"  src="https://thumbs.dreamstime.com/b/print-wallpaper-fantasy-design-modern-art-fog-forest-colored-mystic-background-magical-magic-artistic-fairytale-dream-113837169.jpg" />
      </div>
    </Carousel>
      </div>
      <div>
      <Row >
        {dataSource && (
          <div> 
             <Col span={24} key={dataSource.id}>
             
                <Card
                  hoverable
                  size="large"
                  title={`${dataSource.title}`}
                  extra={<a href={`detailsmovie/:${dataSource.id}`}>Details</a>}
                  cover={
                    <img
                      alt="example"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGb56xEqrOH5PIAa5EQqJvrYa1OcEplrdQjA&usqp=CAU"
                    />
                  }>
                  <Meta
                    title="Europe Street beat"
                    description={`Language:${dataSource.originalLanguage} | Budget:$${dataSource.budget}`}
                  />
                </Card>
            
            </Col>
          </div>
        ) 
        }
      </Row>
      </div>
     
    </div>
  )
}

export default SingleMovieDetails
