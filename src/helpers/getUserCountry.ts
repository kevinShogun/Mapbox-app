import { thisCountryApi } from "../apis";


/**
 * @description - This function gets the country code of the user
 * @async
 * @returns {Promise<any>} - Returns a promise with the country code of the user
 */
export const getUserCountry = async (): Promise<any> => {
	const country = await thisCountryApi.get(``);
	// console.log(country.data.features[0].properties);
    return localStorage.setItem("thisCountry", country.data.features[0].properties.short_code)
}
