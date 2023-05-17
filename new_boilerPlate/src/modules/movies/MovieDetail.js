import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import { map } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import imagePlaceholder from '../../assets/images/imagePlaceholder.png';
import { defaultDateFormat, MOVIE_STATUS } from '../../common/constants';
import { getTimeFromMins } from '../../common/utils';
import LoaderComponent from '../../components/LoaderComponent';
import { MOVIE } from './graphql/Queries';

const { Text } = Typography;
function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const history = useHistory();
  const [fetchMovie, { data, loading }] = useLazyQuery(MOVIE, {
    fetchPolicy: 'network-only',
    onError() {},
  });
  useEffect(() => {
    if (id) {
      fetchMovie({
        variables: { id },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    setMovie(data?.movie?.data);
  }, [data]);

  const handleBack = () => {
    history?.goBack();
  };

  const handleStatus = () => {
    switch (movie?.status) {
      case MOVIE_STATUS.PENDING:
        return <Tag color="warning">{movie?.status}</Tag>;

      case MOVIE_STATUS.RELEASED:
        return <Tag color="success">{movie?.status}</Tag>;

      default:
        return movie?.status;
    }
  };

  if (loading) {
    return <LoaderComponent />;
  }

  const movieDetailContent = (
    <>
      <div>
        <Space
          direction="horizontal"
          align="center"
          split={<Divider type="vertical" />}
        >
          <Typography.Text className="movie-detail-description">
            <CalendarOutlined className="mr-8" />
            {moment(movie?.releaseDate).format(defaultDateFormat)}
          </Typography.Text>
          <Typography.Text className="movie-detail-description">
            <ClockCircleOutlined className="mr-8" />
            {getTimeFromMins(movie?.runtime)}
          </Typography.Text>
          <Typography.Text className="movie-detail-description">
            {map(movie?.genres, (genre) => (
              <Tag key={genre?.id}>{genre?.name} </Tag>
            ))}
          </Typography.Text>
        </Space>
      </div>
      <Descriptions className="mt-16">
        <Descriptions.Item label="Overview">
          {movie?.overview}
        </Descriptions.Item>
        <Descriptions.Item label="Status">{handleStatus}</Descriptions.Item>
        <Descriptions.Item label="Original Language">
          {movie?.originalLanguage}
        </Descriptions.Item>
        <Descriptions.Item label="Budget">${movie?.budget}</Descriptions.Item>
        <Descriptions.Item label="Revenue">${movie?.revenue}</Descriptions.Item>
      </Descriptions>
    </>
  );
  const Content = ({ children, extraContent }) => (
    <Row className="movie-content">
      <div className="flex-1">{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
  return (
    <Card
      title={
        <>
          <Button
            type="text"
            shape="circle"
            onClick={handleBack}
            icon={<ArrowLeftOutlined />}
          />
          {movie?.title}
          <Text type="secondary" className="ml-8">
            {movie?.tagline}
          </Text>
        </>
      }
    >
      <Content
        extraContent={<img src={imagePlaceholder} alt="content" width="100%" />}
      >
        {movieDetailContent}
      </Content>
    </Card>
  );
}

export default MovieDetail;
