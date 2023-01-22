import { useContext } from "react";
import Lottie from "lottie-react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MapContext } from "../context";
import cardDrive from "../assets/134193-red-car-drive.json";

export const DetailsRoute = () => {
	const { details } = useContext(MapContext);

	const setColor = (num: number) => {
		if (num <= 40) {
			return "rgb(34 197 94)";
		}
		if (num > 40 && num < 70) {
			return "rgb(234 179 8)";
		}
		if (num > 70) {
			return "rgb(239 68 68)";
		}
	};

	return details.isShow ? (
		<div
			style={{
				position: "fixed",
				bottom: "80px",
				left: "20px",
				borderRadius: "10px",
				background: "#fff",
				transition: "all",
				transitionDuration: "1s",
				transitionTimingFunction: "ease-in-out",
				width: "250px",
			}}
		>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Detalles del viaje</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Lottie animationData={cardDrive} />
					<br />
					<b>
						Distancia:{" "}
						<span style={{ color: setColor(details.kms) }}>
							{details.kms} km
						</span>
					</b>
					<br />
					<b>
						Tiempo estimado:{" "}
						<span style={{ color: setColor(details.minutes) }}>
							{details.minutes} min
						</span>{" "}
					</b>
				</AccordionDetails>
			</Accordion>
		</div>
	) : (
		<></>
	);
};
