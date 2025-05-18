import { useEffect, useState } from "react";

const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const reset=()=>{
    setData(null);
    setLoading(false);
    setError(null);
  }



  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch:fetchData,reset };
};
export default useFetch;
