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
	const { details, typeDistance } = useContext(MapContext);

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

	function convertMinutesHours(min: number) {
		if (min < 60) {
			return `${min} mins`;
		} else {
			const hours = Math.floor(min / 60);
			const minRestantes = min % 60;
			if (minRestantes === 0) {
				return `${hours} h`;
			} else {
				return `${hours} h ${minRestantes} mins`;
			}
		}
	}

	return details.isShow ? (
		<div
			style={{
				position: "fixed",
				bottom: "80px",
				left: "20px",
				borderRadius: "10px",
				fontSize: "14px",
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
					<Typography>Trip details</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Lottie animationData={cardDrive} />
					<br />
					<b>
						Distance:{" "}
						<span style={{ color: setColor(details.kms) }}>
							{
								typeDistance === "km" ? (
									`${details.kms} km`
								) : (
									`${(details.kms * 0.621371).toFixed(2)} mi`
								)
							}
						</span>
					</b>
					<br />
					<b>
						Estimated time:{" "}
						<span style={{ color: setColor(details.minutes) }}>
							{convertMinutesHours(details.minutes)}
						</span>{" "}
					</b>
				</AccordionDetails>
			</Accordion>
		</div>
	) : (
		<></>
	);
};

/**
 * !Documentation
 * @description: This code defines a React functional component called DetailsRoute 
 * that displays trip details in an accordion format. It uses the MapContext to access 
 * the trip details. The component calculates the color for the distance and estimated 
 * time based on certain conditions. It also includes a helper function to convert 
 * minutes to hours and minutes format.
 *  */