import axios from "axios"

const spotify_axios_client = axios.create({
	baseURL: "https://api.spotify.com/v1"
})

const authorize_base_url = "https://accounts.spotify.com/authorize"
const authorize_params = {
	client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
	response_type: "code",
	redirect_uri: "http://localhost:3000",
	scope: "playlist-read-private playlist-read-collaborative"
}
const authorize = `${authorize_base_url}/?client_id=${authorize_params.client_id}&response_type=${authorize_params.response_type}&redirect_uri=${authorize_params.redirect_uri}&scope=${authorize_params.scope}`

const spotify_api = {
	authorize: authorize
}

export default spotify_api
