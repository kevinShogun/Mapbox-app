import { useContext, useState } from "react";
import {
	Avatar,
	Button,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { MapContext, PlacesContext } from "../context";
import { Container } from "@mui/system";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import { Feature } from "../interfaces/places";

export const SearchResult = () => {
	const { isLoadingPlaces, places } = useContext(PlacesContext);
	const { map } = useContext(MapContext);
	const [activePlaceId, setActivePlaceId] = useState("");

	const onClickPlace = (place: Feature) => {
		const [lng, lat] = place.center;
		setActivePlaceId(place.id);

		map?.flyTo({
			zoom: 16,
			center: [lng, lat],
		});
	};

	if (isLoadingPlaces) {
		return (
			<div
				style={{
					fontWeight: "bold",
					background: "#fff",
					borderBottomLeftRadius: "8px",
					borderBottomRightRadius: "8px",
					color: "#555",
					textAlign: "center",
				}}
			>
				<div
					style={{
						background: "rgba(0,0,0,0.1)",
						padding: "8px 20px",
						borderBottomLeftRadius: "8px",
						borderBottomRightRadius: "8px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<p>Buscando lugares</p>
						&nbsp;
						<TravelExploreIcon />
					</div>
					Espere por favor...
				</div>
			</div>
		);
	}

	if (places.length === 0) {
		return <></>;
	}

	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 310,
				bgcolor: "background.paper",
				display: "flex",
				flexDirection: "column",
				height: 430,
				overflow: "hidden",
				overflowY: "scroll",
				borderRadius: "8px",
			}}
		>
			{places.map((p, index) => (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
					key={p.id}
				>
					<ListItem
						sx={{
							cursor: "pointer",
							"&:hover": {
								border: "1px solid #ccc",
								color: "gray",
								background: "rgba(0,0,0,0.1)",
							},
							background: p.id === activePlaceId ? "#82b1ff" : "",
						}}
						onClick={() => onClickPlace(p)}
					>
						<ListItemAvatar>
							<Avatar>
								<ExploreIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={`${p.text}`} secondary={p.place_name} />
					</ListItem>
					<Button
						color="primary"
						disabled={false}
						size="small"
						onClick={function () {}}
						variant="outlined"
						endIcon={<AssistantDirectionIcon />}
						sx={{
							margin: "5px 10px",
						}}
					>
						Direcciones
					</Button>
				</div>
			))}
		</List>
	);
};
