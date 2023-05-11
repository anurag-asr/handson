import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Card, Col, Image, Input, Modal, Row, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { Link, useLocation } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DELETE_MOVIE_QUERY, FEATURED_MOVIES_QUERY } from "../../graphQl/movie";
import InfiniteScroll from "react-infinite-scroll-component";



const MovieListing = () => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState();
  const location = useLocation();

  //########### Queries ##########
  const [deleteMovie] = useMutation(DELETE_MOVIE_QUERY);
  const [getMoviesData] = useLazyQuery(FEATURED_MOVIES_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setDataSource([...dataSource, ...res?.movies?.data]);
    },
    onError(err) {
      console.log("", err);
    },
  });
  // ##############################

  const fetchMovieData = async (p) => {
    try {
      getMoviesData({
        variables: {
          sort: {
            field: "createdAt",
            order: "DESC",
          },
          filter: {
            limit: 10,
            skip: p * 10,
          },
        },
      });
    } catch (error) {
      console.log("error while fecthing the movie data from api", error);
    }
  };

  const fetchMoreData = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log("error while scroll fetching the data", error);
    }
  };

  const deletemovieByid = async (id) => {
    Modal.confirm({
      title: "Are You sure you want to delete",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        try {
          deleteMovie({
            variables: {
              id: id,
            },
          });
          setDataSource((pre) => {
            return pre.filter((elem) => elem.id !== id);
          });
        } catch (error) {
          console.log("error whole deleting the movie ", error);
        }
      },
    });
  };

  useEffect(() => {
    fetchMovieData(page)
    // eslint-disable-next-line
  }, [page, location.pathname]);

  return (
    <div>
      <div className="movie_page_btn"></div>
      <div className="persona_page_btn">
        <Link to="/addmovie">
          <Button>Add Movie</Button>
        </Link>
        <Input.Search
          placeholder="Enter Your Movie Name"
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
      </div>
      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={true}
        loader={loading ? <Spin size="small" /> : <h6>...</h6>}
      >
        <div className="home_page">
          <Row gutter={[16, 16]} className="moviescrolldiv">
            {dataSource ? (
              dataSource.map((elem) => (
                <Col span={8} key={elem.id}>
                  <Link></Link>
                  <Card
                    hoverable
                    size="small"
                    title={`${elem.title}`}
                    extra={<a href={`detailsmovie/${elem.id}`}>Details</a>}
                    cover={
                      
                      <Image
                        alt="example"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGb56xEqrOH5PIAa5EQqJvrYa1OcEplrdQjA&usqp=CAU"
                      />
                    }
                    actions={[
                      <a href={`/movie_edit/${elem.id}`}>
                        <EditOutlined key="edit" />
                      </a>,
                      <DeleteOutlined
                        key="setting"
                        onClick={() => {
                          deletemovieByid(elem.id);
                        }}
                      />,
                    ]}
                  >
                    <Meta
                      title={elem.title}
                      description={`Language:${elem.originalLanguage} | Budget:$${elem.budget}`}
                    />
                  </Card>
                </Col>
              ))
            ) : (
              <div className="spin">
                <Spin size="large" />
              </div>
            )}
          </Row>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieListing;
