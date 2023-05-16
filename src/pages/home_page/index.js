import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { FEATURED_MOVIES_QUERY } from "../../graphql/movie";

const Home = () => {
  const [dataSource, setDataSource] = useState();
  const [homeDataFetch] = useLazyQuery(FEATURED_MOVIES_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setDataSource(res?.listMovies?.data);
    },
  });

  useEffect(() => {
    homeDataFetch({
      variables: {
        sort: {
          field: "createdAt",
          order: "DESC",
        },
        filter: {
          limit: 5,
        },
      },
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home_page">
      <Row gutter={[16, 16]} className="homepageScroll">
        {dataSource ? (
          dataSource.map((elem) => (
            <Col span={8} key={elem.id}>
              <Link to={`/details/${elem.id}`}>
                <Card
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
          ))
        ) : (
          <h1>Loading.......</h1>
        )}
      </Row>
    </div>
  );
};

export default Home;
