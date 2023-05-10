import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Button, Card, Col, Input, Row, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { FEATURED_MOVIES_QUERY } from "../../graphQl/movie";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};


const MovieListing = () => {
  const [page, setPage] = useState(0);
  const [state,setState] = useState({items: Array.from({ length: 20 })})
  // const state = ;
  const [dataSource, setDataSource] = useState([]);
  const [searchedText, setSearchedText] = useState();
  const [getMoviesData] = useLazyQuery(FEATURED_MOVIES_QUERY, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    onCompleted(res) {
      setDataSource([...dataSource,...res?.movies?.data]);
    },
    onError(err) {
      console.log(err);
    },
  });
  
  const fetchMovieData=(x)=>{
    getMoviesData({
      variables: {
        sort: {
          field: "createdAt",
          order: "DESC",
        },
        filter: {
          limit: 9,
          skip: x*9,
        },
      },
    });
  }

  useEffect(() => {
    fetchMovieData(page)
  }, [page]);


  const fetchMoreData = () => {
    
    setTimeout(()=>{
      setPage((prev)=>prev+1)
    },500)
   
  };

  const deletemovieByid = (id) => {
    setDataSource((pre) => {
      return pre.filter((elem) => elem.id !== id);
    });
  };

  console.log(dataSource)

  return (
    <div>
      <div className="movie_page_btn"></div>
      <div className="persona_page_btn">
        <Link to="/addmovie">
          <Button>Add Movie</Button>
        </Link>
        <Input.Search
          placeholder="Enter Your Text"
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
      </div>

      <div className="home_page">
        <InfiniteScroll
          dataLength={dataSource.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
           {
            <Row gutter={[16, 16]} className="moviescrolldiv">
              {dataSource ? (
                dataSource.map((elem) => (
                  <Col span={8} key={elem.id}>
                    <Card
                      hoverable
                      size="small"
                      title={`${elem.title}`}
                      extra={<a href={`detailsmovie/${elem.id}`}>Details</a>}
                      cover={
                        <img
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
                        title="Europe Street beat"
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
          } 
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MovieListing;
