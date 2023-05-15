import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import FormTable from "../../hoc/MovieForm";
import { MOVIE_QUERY_BY_ID } from "../../graphQl/movieedit";

const MovieEdit = () => {
  const { id } = useParams();
  const [dataById, setDataById] = useState();

  const [movieEdit] = useLazyQuery(MOVIE_QUERY_BY_ID,{
    fetchPolicy:"network-only",
    onCompleted(res){
      setDataById(res?.movie?.data)
    }
  })

  useEffect(() => {
    movieEdit({
      variables: {
        id: id,
      },
    })
  }, []);

  return (
    <div className="movie_edit">
      {dataById && <FormTable id={id} dataById={dataById} />}
    </div>
  );
};

export default MovieEdit;
