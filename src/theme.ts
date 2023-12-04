import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: "light",
		background: {
			default: "#fff",
		},
        secondary: {
            main: '#c7d4dd'
        }
    }
});

export default theme;