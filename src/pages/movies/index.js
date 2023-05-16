import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Card, Col, Image, Input, Modal, Row, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { Link, useLocation } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DELETE_MOVIE_QUERY, FEATURED_MOVIES_QUERY } from "../../graphql/movie";
import { Select } from "antd";

const MovieListing = () => {
  const [sortby, setSortBy] = useState("DESC");
  const [page, setPage] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState();
  const location = useLocation();
  const containerRef = useRef(null);

  //########### Queries ##########
  const [deleteMovie] = useMutation(DELETE_MOVIE_QUERY);
  const [getMoviesData, { fetchMore }] = useLazyQuery(FEATURED_MOVIES_QUERY, {
    fetchPolicy: "network-only",
    onCompleted(res) {
      setDataSource((prev) => [...prev, ...res?.listMovies?.data]);
    },
    onError(err) {
      console.log("", err);
    },
  });

  let limit = 9;
  const fetchMovieData = async () => {
    try {
      getMoviesData({
        variables: {
          sort: {
            field: "createdAt",
            order: sortby,
          },
          filter: {
            limit: limit,
            skip: dataSource.length,
            searchTerm: searchedText,
          },
        },
      });
    } catch (error) {
      console.log("error while fetching the movie data from api", error);
    }
  };

  const deleteMovieId = async (id) => {
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

  const handleSortBy = (value) => {
    setSortBy(value);
  };

  let id;
  const handleChange = (e) => {
    clearTimeout(id);
    id = setTimeout(() => {
      setSearchedText(e.target.value);
    }, 1000);
  };

  useEffect(() => {
    fetchMovieData(page);
    // eslint-disable-next-line
  }, [page, location.pathname]);

  useEffect(() => {
    const fetchDataOnSearch = async () => {
      const { data } = await fetchMore({
        variables: {
          sort: {
            field: "createdAt",
            order: sortby,
          },
          filter: {
            limit: limit,
            skip: limit * page,
            searchTerm: searchedText,
          },
        },
      });
      setDataSource([...data?.listMovies?.data]);
    };
    fetchDataOnSearch();
    // eslint-disable-next-line
  }, [searchedText, sortby]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="movie_page_btn"></div>
      <div className="persona_page_btn">
        <Link to="/movie/create">
          <Button>Add Movie</Button>
        </Link>
        <Input.Search
          placeholder="Enter Your Movie Name"
          onChange={handleChange}
        />
        <Select
          defaultValue="DESC"
          style={{
            width: 120,
            marginLeft: "5px",
          }}
          onChange={handleSortBy}
          options={[
            {
              value: "ASC",
              label: "ASC",
            },
            {
              value: "DESC",
              label: "DESC",
            },
          ]}
        />
      </div>
      <div className="movieScrollDiv" ref={containerRef}>
        <div className="home_page">
          <Row gutter={[16, 16]} >
            {dataSource ? (
              dataSource.map((elem) => (
                <Col xs={{span:24}} md={{span:12}} lg={{span:8}} key={elem.id}>
                  <Card
                    size="small"
                    title={`${elem.title}`}
                    extra={<a href={`details/${elem.id}`}>Details</a>}
                    cover={
                      <Image
                        alt="example"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGb56xEqrOH5PIAa5EQqJvrYa1OcEplrdQjA&usqp=CAU"
                      />
                    }
                    actions={[
                      <a href={`/movie/edit/${elem.id}`}>
                        <EditOutlined key="edit" />
                      </a>,
                      <DeleteOutlined
                        key="setting"
                        onClick={() => {
                          deleteMovieId(elem.id);
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
      </div>
    </div>
  );
};

export default MovieListing;
