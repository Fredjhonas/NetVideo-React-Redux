import { useQuery } from "@tanstack/react-query"

const fetchMovies = async (search?: string) => {
  const keyApi = "1e6296feeb7565b54f1f8ea079f7e70e";
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&language=es&query=${search}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const filterData = data.results.slice(0, 10).map((movie: any) => movie);
  return filterData;
}

export const useFetchMovies = (search?: string) => {
  const query = useQuery(["movies"], async () => await fetchMovies(search))
  return query;
}