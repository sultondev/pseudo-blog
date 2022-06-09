import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../typing/types/Post.type";
import { VoidSetter } from "../typing/types/VoidSetter.type";

const fetchApi = (
  url: string,
  loadingSet: VoidSetter,
  dataSet: VoidSetter,
  errorSet: VoidSetter
) => {
  axios
    .get(url)
    .then((res) => {
      loadingSet(false);
      dataSet(res.data);
    })
    .catch((error) => {
      loadingSet(false);
      errorSet(error);
    });
};

export const useAPI = <T,>(url: string) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [errorAPI, setErrorAPI] = useState();

  const load = () => {
    fetchApi(url, setLoading, setData, setErrorAPI);
  };

  useEffect(load, []);

  return { loading, data, errorAPI, reload: load };
};
