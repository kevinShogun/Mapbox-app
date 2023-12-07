import { useContext, useState } from 'react'
import { Box, Typography, Slider, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { MapContext } from '../context';

export const SliderOptions = () => {

    const { markerRadius, setMarkerRadius, typeDistance, setTypeDistance} = useContext(MapContext);
    const [raduisValue, setRaduisValue] = useState<number | undefined>(markerRadius);
    const [sliderValue, setSliderValue] = useState<number | number[] | undefined>();
    

    const handleChangeSelect = (e: any) => {
        setRaduisValue(Number(e.target.value));
        setMarkerRadius(Number(e.target.value));
    }

    return (
        <Box
            // block drag event
            onDragStart={(e) => e.preventDefault()}
            
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
            gap={3}
            sx={{
                flexDirection: "row",
                "@media (max-width: 600px)": {
                    flexDirection: "column",
                },
                backgroundColor: '#fff',
                padding: '5px',
                borderRight: "2px solid #c7d4dc",
                borderBottom: "2px solid #c7d4dc",
                borderLeft: "2px solid #c7d4dc",
            }}
        >
            <Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						border: "1px solid #ccc",
						padding: "0.2rem",
						gap: "0.5rem",
						borderRadius: "5px",
                        'media (max-width: 600px)': {
                            width: '100%',
                        }
					}}
				>
					<Button
						sx={{ flex: "1", boxShadow: "none"}}
						variant={typeDistance === 'km' ? 'contained' : 'text'}
                        color={typeDistance === 'km' ? 'primary':  'secondary' }
						onClick={(e) => {
							e.stopPropagation();
							setTypeDistance('km');
						}}
					>
					    Km
					</Button>
					<Button
						sx={{ flex: "1", boxShadow: "none"}}
						variant={typeDistance === 'mi' ? 'contained' : 'text'}
                        color={typeDistance === 'mi' ? 'primary':  'secondary' }
						onClick={(e) => {
							e.stopPropagation();
                            setTypeDistance('mi');
						}}
					>
						Mi
					</Button>
				</Box>
            <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                width='100%'
            >
                <FormControl fullWidth>
                    <InputLabel htmlFor="condition-select"
                        color='secondary'
                        sx={{
                            color: "#c7d4dc",
                        }}
                    >
                        Preset Radius
                    </InputLabel>
                    <Select
                        color='secondary'
                        variant='outlined'
                        id="condition-select"
                        label="Preset Radius"
                        value={raduisValue}
                        onChange={handleChangeSelect}
                        sx={{

                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "2px solid #c7d4dc",
                                "&:hover": {
                                    border: "2px solid #c7d4dc",
                                },
                                "&:focus": {
                                    border: "2px solid #c7d4dc",
                                }
                            },

                        }}
                    >
                        <MenuItem value={1}> 1 {typeDistance} </MenuItem>
                        <MenuItem value={5}> 5 {typeDistance} </MenuItem>
                        <MenuItem value={15}> 15 {typeDistance} </MenuItem>
                        <MenuItem value={25}> 25 {typeDistance} </MenuItem>
                    </Select>
                </FormControl>

            </Box>

            <Box width='100%'
                sx={{
                    padding: "2px 10px",
                }}
            >
                <Typography variant='body2' sx={{ fontWeight: 500, color: "#515d67" }}>
                    Manual radius tooogle
                </Typography>
                <Slider
                    defaultValue={20}
                    aria-label='Default'
                    valueLabelDisplay='auto'
                    value={sliderValue}
                    onChange={(e, value) => {
                        setSliderValue(value);
                        setMarkerRadius(value as number);
                        setRaduisValue(undefined);
                    }}
                    step={100}
                    marks
                    min={10}
                    max={1000}
                    color='secondary'
                    sx={{
                        "& .MuiSlider-mark": {
                            backgroundColor: "#c7d4dc",
                        },
                        "& .MuiSlider-markLabel": {
                            color: "#515d67",
                        },
                        "& .MuiSlider-thumb": {
                            color: "#fafafa",
                        },
                    }}
                />
                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    width='100%'
                >
                    <Typography variant='body2' sx={{ fontWeight: 500, color: "#515d67" }}>
                        10 {typeDistance}
                    </Typography>
                    <Typography variant='body2' sx={{ fontWeight: 500, color: "#515d67", }}>
                        1000 {typeDistance}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
/**
 * !Documentation
 * @description: This code defines a React functional component called SliderOptions 
 * that renders a slider and a select dropdown. The component uses the useContext and 
 * useState hooks from the React library to manage state. 
 * It also imports various components from the Material-UI library for styling and 
 * user interface elements.
 *  */