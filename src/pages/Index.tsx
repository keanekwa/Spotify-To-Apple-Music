import React from "react"
import spotify_api from "../helpers/spotify_api"

const Index = () => {
	return (
		<div className="App">
			<header className="App-header">
				<a href={spotify_api.authorize}>
					<button>Authorize</button>
				</a>
			</header>
		</div>
	)
}

export default Index
