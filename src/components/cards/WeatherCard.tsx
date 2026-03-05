import { Box, Typography, Paper } from "@mui/material";

export default function WeatherCard({ data }: any) {

  return (
    <Paper
      sx={{
        mt:2,
        p:3,
        borderRadius:4,
        background:"#2b2b2b",
        color:"#fff"
      }}
    >

      <Typography variant="subtitle2">
        {data.location}
      </Typography>

      <Typography variant="h3">
        {data.temperature}°
      </Typography>

      <Typography>
        {data.description}
      </Typography>

      <Box
        sx={{
          display:"flex",
          gap:3,
          mt:2
        }}
      >
        {data.forecast.map((d:any,i:number)=>(
          <Box key={i} sx={{ textAlign:"center" }}>
            <Typography>{d.day}</Typography>
            <Typography>{d.high}°</Typography>
            <Typography sx={{opacity:0.6}}>
              {d.low}°
            </Typography>
          </Box>
        ))}
      </Box>

    </Paper>
  );
}