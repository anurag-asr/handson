import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { Card, Col, Image, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { MOVIE_QUERY_BY_ID } from "../../graphql/movie";

const SingleMovieDetails = () => {
  const [dataSource, setDataSource] = useState();
  const { id } = useParams();
  const [singleMovieFetch] = useLazyQuery(MOVIE_QUERY_BY_ID, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setDataSource(res?.movie?.data);
    },
  });

  useEffect(() => {
    singleMovieFetch({
      variables: {
        id: `${id}`,
      },
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="singleMovieDetails">
      <div>
        <Carousel
          autoplay
          autoplaySpeed={1000}
          pauseOnHover={false}
          arrows
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
          effect="fade"
        >
          <div>
            <Image
              className="singleMovieImage"
              width="100%"
              src="https://thumbs.dreamstime.com/b/sunset-sunrise-landscape-panorama-beautiful-nature-beach-colorful-red-orange-purple-clouds-reflected-ocean-49632998.jpg"
            />
          </div>
          <div>
            <Image
              className="singleMovieImage"
              width="100%"
              src="https://thumbs.dreamstime.com/b/travel-boat-thailand-island-beach-tropical-coast-asia-landsc-landscape-background-32070946.jpg"
            />
          </div>
          <div>
            <Image
              className="singleMovieImage"
              width="100%"
              src="https://thumbs.dreamstime.com/b/nature-panorama-mountain-landscape-sunset-norway-44518447.jpg"
            />
          </div>
          <div>
            <Image
              className="singleMovieImage"
              width="100%"
              src="https://thumbs.dreamstime.com/b/print-wallpaper-fantasy-design-modern-art-fog-forest-colored-mystic-background-magical-magic-artistic-fairytale-dream-113837169.jpg"
            />
          </div>
        </Carousel>
      </div>

      <div>
        <Row>
          {dataSource && (
            <div>
              <Col span={24} key={dataSource.id}>
                <Card
                  hoverable
                  size="large"
                  title={`${dataSource.title}`}
                  extra={<a href={`details/:${dataSource.id}`}>Details</a>}
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
              </Col>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default SingleMovieDetails;
