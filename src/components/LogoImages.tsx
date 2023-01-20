import vite from "../assets/vitejs.svg";
import react from "../assets/react.svg";

export const LogoImages = () => {
	return (
		<div
			style={{
				width: "110px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				position: "fixed",
				bottom: "10px",
				right: "30px",
			}}
		>
			<img src={react} alt="React logo" width="40px" />
			<p
				style={{
					fontWeight: "bold",
					fontSize: "30px",
					color: "#aaa",
				}}
			>
				+
			</p>
			<img src={vite} alt="vite logo" width="28px" />
		</div>
	);
};
