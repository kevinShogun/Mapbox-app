import { BtnMylocation, LogoImages, MapView, SearchBar } from "../components"
import { DetailsRoute } from "../components/DetailsRoute"

export const HomeScreen = () => {
  return (
    <div>
        <MapView/>
        <SearchBar/>
        <BtnMylocation/>
        <LogoImages/>
        <DetailsRoute/>
    </div>
  )
}
