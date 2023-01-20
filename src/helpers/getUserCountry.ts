import { thisCountryApi } from "../apis";

export const getUserCountry = async (): Promise<any> => {
	const country = await thisCountryApi.get(``);
	console.log(country.data.features[0].properties);
    return localStorage.setItem("thisCountry", country.data.features[0].properties.short_code)
}
