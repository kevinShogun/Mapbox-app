import { MapView, SearchBar } from "../components"
import { DetailsRoute } from "../components/DetailsRoute"
import DraggableDialog from "../components/DraggableDialog"

export const HomeScreen = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        overflow: "hidden", // hide scrollbars
      }}
    >
        <MapView/>
        <DraggableDialog/>
        <DetailsRoute/>
    </div>
  )
}
