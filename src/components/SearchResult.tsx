import { useContext, useEffect, useRef, useState } from "react";
import {
	Avatar,
	Button,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { MapContext, PlacesContext } from "../context";
import { Container } from "@mui/system";
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import { Feature } from "../interfaces/places";

export const SearchResult = () => {
	const { isLoadingPlaces, places, userLocation } = useContext(PlacesContext);
	const { map, getRouteBetweenPoints } = useContext(MapContext);
	const [activePlaceId, setActivePlaceId] = useState("");
	const [isShow, setIsShow] = useState(true);
	const divClikRef = useRef<any>(null);

	const onClickPlace = (place: Feature) => {
		const [lng, lat] = place.center;
		setActivePlaceId(place.id);

		map?.flyTo({
			zoom: 16,
			center: [lng, lat],
		});
	};

	useEffect(() => {
		if (places.length > 0 && !isLoadingPlaces) {
			// click first place
			const divClick = document.getElementById(places[0].id + " list-item");
			if (divClick) {
				divClick.click();
			}
			const [lng, lat] = places[0].center;
			setActivePlaceId(places[0].id);
			map?.flyTo({
				zoom: 16,
				center: [lng, lat],
			});

		}
	}, [places])
	

	const getRoute = (place: Feature) => {
		if (!userLocation) return;
		const [lng, lat] = place.center;
		map?.flyTo({
			zoom: 16,
			center: [lng, lat],
		});
		getRouteBetweenPoints(userLocation, [lng, lat]);
		setActivePlaceId(place.id);
	};

	if (isLoadingPlaces) {
		return (
			<div
				style={{
					fontWeight: "bold",
					background: "#000",
					borderBottomLeftRadius: "8px",
					borderBottomRightRadius: "8px",
					color: "#555",
					textAlign: "center",
					transition: "all 0.2s ease-in-out",

				}}
				
			>
				<div
					style={{
						background: "#fff",
						padding: "8px 20px",
						borderBottomLeftRadius: "8px",
						borderBottomRightRadius: "8px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						transition: "all 0.2s ease-in-out",

					}}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<p>Searching for places</p>
						&nbsp;
						<TravelExploreIcon />
					</div>
					Please wait...
				</div>
			</div>
		);
	}

	if (places.length === 0) {
		return <></>;
	}

	return (
		<div>
			<Link
				component="button"
				variant="body2"
				onClick={() => {
					setIsShow(!isShow);
				}}
				sx={{
					marginLeft: "5px",
					marginBottom: "1px",
					marginTop: "8px"
				}}
			>
				{!isShow ? 'Show' : 'Hide'} results
			</Link>

			{isShow && (
				<List
					sx={{
						width: "100%",
						maxWidth: 530,
						"@media (max-width: 600px)": {
							width: "300px",
	
						},
						bgcolor: "background.paper",
						display: "flex",
						flexDirection: "column",
						height: 430,
						overflow: "hidden",
						overflowY: "scroll",
					}}
					onMouseUp={() => {
						console.log("mouseup")
					}}
					onMouseDown={() => {
						console.log("mousedown")
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
									width: "100%",
									cursor: "pointer",
									borderRadius: "5px",
									transition: "all 0.2s ease-in-out",
									margin: "5px 10px",
									"&:hover": {
										background: "rgba(0,0,0,0.1)",
									},
									background: p.id === activePlaceId ? "#aae3f4a0" : "",
								}}
								id={p.id + " list-item"}
								ref={divClikRef}
								onClick={() => onClickPlace(p)}
							>
								<ListItemAvatar>
									<Avatar>
										<ExploreIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={`${p.text}`}
									secondary={p.place_name}
									sx={{
										'& .MuiListItemText-primary': {
											fontWeight: 'medium',
										},
										'& .MuiListItemText-secondary': {
											fontSize: '12px',
											color: '#555',
										},
									}}
								/>
							</ListItem>
							<Button
								color="primary"
								disabled={false}
								size="small"
								onClick={() => getRoute(p)}
								variant="outlined"
								endIcon={<DirectionsOutlinedIcon />}
								sx={{
									margin: "5px 10px",
								}}
							>
								Go to
							</Button>
						</div>
					))}
				</List>
			)}
		</div>
	);
};
