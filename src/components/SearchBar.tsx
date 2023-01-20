import { ChangeEvent, useContext, useRef } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { PlacesContext } from "../context";
import { SearchResult } from "./SearchResult";

export const SearchBar = () => {
	const debounceRef = useRef<NodeJS.Timeout>();

	const { searchPlacesByQuery, places } = useContext(PlacesContext);

	const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			// todo: Ejecutar consulta
			searchPlacesByQuery(e.target.value);
		}, 900);
	};

	return (
		<div
			style={{
				position: "fixed",
				top: "80px",
				left: "30px",
				boxShadow: places.length > 0 ? "0px 5px 10px rgba(0, 0, 0, 0.2)" : "",
				borderRadius: places.length > 0 ? "10px" : "",
				background: places.length > 0 ? "#fff" : "",
				transition: "all",
				transitionDuration: "1s",
				transitionTimingFunction: "ease-in-out",
			}}
		>
			<br />
			<div
				style={{
					padding: "8px 25px",
					display: "flex",
					alignItems: "center",
					color: "#aaa",
					boxShadow:
						places.length === 0 ? "0px 5px 10px rgba(0, 0, 0, 0.2)" : "",
					borderRadius: places.length === 0 ? "10px" : "",
					background: places.length === 0 ? "#fff" : "",
					transition: "all",
					transitionDuration: "1s",
					transitionTimingFunction: "linear",
				}}
			>
				<SearchIcon
					style={{
						margin: "0 5px",
					}}
				/>
				<InputBase
					style={{
						color: "#aaa",
					}}
					placeholder="Buscar un lugar"
					onChange={onQueryChange}
				/>
			</div>
			<SearchResult />
		</div>
	);
};
