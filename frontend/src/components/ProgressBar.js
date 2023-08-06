import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const ProgressBar = (props) =>  {
  return (
    <Box display="flex" alignItems="center">

      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>

      <Box minWidth={35}>
        <h2>{`${Math.round(props.value,)}%`}</h2>
      </Box>

    </Box>
  );
}