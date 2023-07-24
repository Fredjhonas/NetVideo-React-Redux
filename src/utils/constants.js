const keyApi = "1e6296feeb7565b54f1f8ea079f7e70e";
const apiUrl = `https://api.themoviedb.org/3`

export const getSearchUrl = (search) => `${apiUrl}/search/movie?api_key=${keyApi}&language=es&query=${search}`
export const getDetailUrl = (id) => `${apiUrl}/movie/${id}?api_key=${keyApi}&language=es`
export const getVideoUrl = (id) => `${apiUrl}/movie/${id}/videos?api_key=${keyApi}&language=es`
