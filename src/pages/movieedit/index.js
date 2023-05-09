import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import FormTable from "../../hoc/MovieForm";
import { MOVIE_QUERY_BY_ID } from "../../graphQl/movieedit";


const MovieEdit = () => {
  const { id } = useParams();
  const [dataById, setDataById] = useState();

  const { loading, error, data } = useQuery(MOVIE_QUERY_BY_ID, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    if (data) {
      setDataById(data?.movie?.data);
    }
  }, [data]);

  if (loading) {
    return "....Loading....";
  }

  return (
    <div className="movie_edit">
      {dataById && <FormTable id={id} dataById={dataById} />}
    </div>
  );
};

export default MovieEdit;
