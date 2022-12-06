import { useEffect } from "react"
import spotifyApi from "../helpers/spotifyApi"
import { useSearchParams } from "react-router-dom"

const SpotifyCallback = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const code = searchParams.get("code")
	const state = searchParams.get("state")

	useEffect(() => {
		if (code && state) {
			spotifyApi.requestAccessToken(code).then((res) => console.log(res))
		}
	}, [])

	return <></>
}

export default SpotifyCallback
