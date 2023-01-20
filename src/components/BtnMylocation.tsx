import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { MapContext, PlacesContext } from "../context";
import { ModalError } from "./ModalError";
import { blue, purple } from "@mui/material/colors";

export const BtnMylocation = () => {
	const { map, isMapReady } = useContext(MapContext);
	const { userLocation } = useContext(PlacesContext);

	const onclick = () => {
		if (!isMapReady) return <ModalError label="Mapa no esta Listo" />;
		if (!userLocation)
			return <ModalError label="No hay ubicación de usuario" />;

		map?.flyTo({
			zoom: 18,
			center: userLocation,
		});
	};

	const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
		color: theme.palette.getContrastText(blue[500]),
		backgroundColor: blue[500],
		"&:hover": {
			backgroundColor: blue[700],
		},
	}));

	return (
		<ColorButton
			variant="contained"
			endIcon={<FmdGoodIcon />}
			onClick={onclick}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
		>
			Mi Ubicación
		</ColorButton>
	);
};
