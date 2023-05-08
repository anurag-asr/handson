import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";

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

const Home = () => {
  const { data } = useQuery(FEATURED_MOVIES_QUERY, {
    variables: {
      sort: {
        field: "popularity",
        order: "DESC",
      },
      filter: {},
    },
  });

  const movieData = data?.movies?.data.slice(0, 6);

  return (
    <div className="home_page">
      <Row gutter={[16, 16]}>
        {movieData &&
          movieData.map((elem) => (
            <Col span={8} key={elem.id}>
              <Link to={`/favourite/${elem.id}`}>
                <Card
                  hoverable
                  size="small"
                  title={`${elem.title}`}
                  extra={<a href="/home">Details</a>}
                  cover={
                    <img
                      alt="example"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGb56xEqrOH5PIAa5EQqJvrYa1OcEplrdQjA&usqp=CAU"
                    />
                  }
                >
                  <Meta
                    title="Europe Street beat"
                    description={`Language:${elem.originalLanguage} | Budget:$${elem.budget}`}
                  />
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Home;
