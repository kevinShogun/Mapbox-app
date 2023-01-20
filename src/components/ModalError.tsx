import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FmdBadOutlinedIcon from "@mui/icons-material/FmdBadOutlined";


interface ModalErroProps {
    label: string
}

export const ModalError = ({label}:ModalErroProps) => {
	const rootRef = React.useRef<HTMLDivElement>(null);

	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				minWidth: 250,
				transform: "translateZ(0)",
				"@media all and (-ms-high-contrast: none)": {
					display: "none",
				},
			}}
			ref={rootRef}
		>
			<Modal
				disablePortal
				disableEnforceFocus
				disableAutoFocus
				open
				aria-labelledby="server-modal-title"
				aria-describedby="server-modal-description"
				sx={{
					display: "flex",
					p: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
				container={() => rootRef.current}
			>
				<Box
					sx={{
						position: "relative",
						minWidth: 250,
						bgcolor: "background.paper",
						borderRadius: "10px",
						boxShadow: (theme) => theme.shadows[23],
						p: 4,
					}}
				>
					<Typography
						id="server-modal-title"
						variant="h5"
						component="h2"
						fontWeight="bold"
						color="red"
					>
						¡Error!
					</Typography>
					<Typography
						id="server-modal-description"
						sx={{ pt: 2 }}
						style={{
							color: "#c62828",
						}}
					>
                        {label}
					</Typography>
					<div
						style={{
							width: "100%",
							height: "100%",
							textAlign: "center",
							margin: "12px 0",
							fontSize: "55px",
							color: "#FF4D4D",
						}}
					>
						<FmdBadOutlinedIcon fontSize="inherit" />
					</div>
				</Box>
			</Modal>
		</Box>
	);
};
