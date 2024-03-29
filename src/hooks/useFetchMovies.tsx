import { useQuery } from "@tanstack/react-query"
import { apiUrl } from "../utils/constants"
import { Movie } from "../interfaces/movie"

const fetchMovies = async (search?: string): Promise<Movie[]> => {
  const url = `${apiUrl}&query=${search}`;
  const response = await fetch(url);
  const data = await response.json()
  const results = data.results as Movie[];
  return results;
}

export const useFetchMovies = (search?: string) => {
  const query = useQuery(["movies"], async () => await fetchMovies(search))
  return query;
}