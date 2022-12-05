interface params {
	[index: string]: string
}

export const createParamString = (params: params) => {
	return (
		"/?" +
		Object.keys(params)
			.map((k) => `${k}=${params[k]}`)
			.join("&")
	)
}
