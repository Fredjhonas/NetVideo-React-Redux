import { useQuery } from "@tanstack/react-query"
import { getDetailUrl, getVideoUrl } from "../utils/constants"
import { Movie } from "../interfaces/movie"

const fetchDetail = async (id?: number): Promise<Movie> => {
  const url = getDetailUrl(id);
  const response = await fetch(url);
  const data = await response.json()
  return data;
}

const fetchVideo = async (id?: number) => {
  const url = getVideoUrl(id);
  const response = await fetch(url);
  const data = await response.json()
  return data?.results || [];
}

const fetchDetailAndVideo = async (id?: number) => {
  const detail = await fetchDetail(id);
  const video = await fetchVideo(id);
  return { detail, video };
}

export const useFetchMovieDetail = (id?: number) => {
  const query = useQuery(["detail"], async () => await fetchDetailAndVideo(id))
  return query;
}