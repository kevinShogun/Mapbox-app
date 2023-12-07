import { ChangeEvent, useContext, useRef, useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import { PlacesContext } from "../context";
import { SearchResult } from "./SearchResult";
import { Box, IconButton } from "@mui/material";
import { SliderOptions } from "./SliderOptions";

export const SearchBar = () => {
	const debounceRef = useRef<NodeJS.Timeout>();

	const { searchPlacesByQuery, places } = useContext(PlacesContext);
	const [search, setSearch] = useState("")

	const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			searchPlacesByQuery(e.target.value);
		}, 900);
	};

	return (
		<Box
			sx={{
				position: "fixed",
				top: "75px",
				right: "30px",
				"@media (max-width: 600px)": {
					top: "70px",
					right: "20px",
				},
				boxShadow: places.length > 0 ? "0px 5px 10px rgba(0, 0, 0, 0.2)" : "",
				borderRadius: places.length > 0 ? "10px" : "",
				padding: places.length > 0 ? "10px" : "",
				background: places.length > 0 ? "#fff" : "",
				transition: "all 0.2s ease-in-out",
			}}
		>
			<Box
				sx={{
					width: "530px",
					padding: "8px 13px",
					"@media (max-width: 600px)": {
						width: "300px",
					},
					display: "flex",
					flexDirection: "row-reverse",
					alignItems: "center",
					color: "#aaa",
					boxShadow:
						places.length === 0 ? "0px 5px 10px rgba(0, 0, 0, 0.2)" : "",
					border: "2px solid #c7d4dc",
					background: "#fff",
					transition: "all 0.2s ease-in-out",
				}}
			>
				<IconButton 
					onClick={() => {
						if (search.length > 0) {
							setSearch("");
							searchPlacesByQuery("");
						}
					}}
				>
					{
						search.length <= 0 ? (
							<SearchIcon />
						) : (
							<ClearIcon />
						)
					}
				</IconButton>
				<InputBase
					style={{
						color: "#aaa",
						width: "100%",
					}}
					placeholder="Adress"
					value={search}
					onChange={onQueryChange}
				/>
			</Box>
			<SliderOptions/>

			<SearchResult />
		</Box>
	);
};
