import { CircularProgress, CircularProgressProps } from "@mui/material";
import { green } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
export const IsLoading = () => {
	const CircularProg = styled(CircularProgress)<CircularProgressProps>(
		({ theme }) => ({
			color: green[400],
            width: 200,
		})
	);

	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				position: "fixed",
				top: 0,
				right: 0,
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				display: "flex",
				justifyContent: "center",
				zIndex: 1,
				alignItems: "center",
			}}
		>
			<div
				style={{
					zIndex: 10,
				}}
			>
				<CircularProg
                    thickness={4.5}
                    size="7rem"
                />
			</div>
		</div>
	);
};
