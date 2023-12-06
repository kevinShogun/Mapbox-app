// export const getUserLocation = async (): Promise<[number, number]> => {
// 	const fetchGeolocation = async () => {		
// 		const res2 = await fetch("/geo");
// 		console.log({res2}, 'res2');
// 		const json2 = await res2.json();
// 		console.log(json2);
// 	};
// 	  fetchGeolocation();
// 	return new Promise((resolve, reject) => {
// 		navigator.geolocation.getCurrentPosition(
// 			({ coords }) => {
// 				resolve([coords.longitude, coords.latitude]);
// 				localStorage.setItem("longitude", coords.longitude.toString());
// 				localStorage.setItem("latitude", coords.latitude.toString());
// 			},
// 			(err) => {
// 				alert("No se pudo obtener la geolocalización");
// 				console.log(err);
// 				reject();
// 			}
// 		);
// 	});
// };

// export const getUserLocation = async (): Promise<[number, number]> => {
// 	try {
// 	  const res = await fetch("/geo"); // Reemplaza "/geo" con tu ruta de Netlify Function
// 	  if (!res.ok) {
// 		throw new Error(`Failed to fetch data: ${res.status}`);
// 	  }
// 	  const locationData = await res.json();
	  
// 	  const longitude = locationData.longitude;
// 	  const latitude = locationData.latitude;
  
// 	  localStorage.setItem("longitude", longitude.toString());
// 	  localStorage.setItem("latitude", latitude.toString());
  
// 	  return [longitude, latitude];
// 	} catch (error) {
// 	  alert("No se pudo obtener la geolocalización");
// 	  console.error("Error:", error);
// 	  throw error;
// 	}
//   };

export const getUserLocation = (): Promise<[number, number]> => {
	return new Promise<[number, number]>((resolve, reject) => {
	  fetch("/geo") // Reemplaza "/geo" con tu ruta de Netlify Function
		.then((res) => {
		  if (!res.ok) {
			throw new Error(`Failed to fetch data: ${res.status}`);
		  }
		  return res.json();
		})
		.then((locationData) => {
		  const longitude = locationData.longitude;
		  const latitude = locationData.latitude;
  
		  localStorage.setItem("longitude", longitude.toString());
		  localStorage.setItem("latitude", latitude.toString());
		  sessionStorage.setItem("locationData", JSON.stringify(locationData));

		  resolve([longitude, latitude]);
		})
		.catch((error) => {
		  alert("No se pudo obtener la geolocalización");
		  console.error("Error:", error);
		  reject(error);
		});
	});
  };
  
  