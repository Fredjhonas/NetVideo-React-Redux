import { useQuery } from "@tanstack/react-query";
import { Movie } from "../interfaces/movie";
import { getSearchUrl } from "../utils/constants";

const fetchMovies = async (search?: string): Promise<Movie[]> => {
  const url = getSearchUrl(search);
  const response = await fetch(url);
  const data = await response.json()
  const results = data.results as Movie[];
  return results;
}

export const useFetchMovies = (search?: string) => {
  const query = useQuery(["movies"], async () => await fetchMovies(search), {
    enabled: false
  })
  return query;
}