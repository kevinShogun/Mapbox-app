import { Typography } from "@mui/material"
import { MapView, SearchBar } from "../components"
import { DetailsRoute } from "../components/DetailsRoute"
import DraggableDialog from "../components/DraggableDialog"
import "../assets/fonts/style.css"

export const HomeScreen = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden", // hide scrollbars
        padding: "100px",
        position: "relative",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "5px",
          left: "50%",
          '@media (max-width: 600px)': {
            top: "15px",
            fontSize: "25px",
          },
          transform: "translateX(-50%)",
          color: "#525e68",
          textAlign: "center",
          fontFamily: "'Accord Alternate', Geneva, Tahoma, sans-serif",
          margin: "0",
          fontSize: "35px",
          fontWeight: "800",
        }}
      >
       Map Radius Tool
      </Typography>
      
        <MapView/>
        <DraggableDialog/>
        <DetailsRoute/>
    </div>
  )
}
