import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Media(props) {
  return (
    <Grid container wrap="wrap" gap={"20px"} justifyContent={"center"}    >
      {(Array.from(new Array(8))).map((item, index) => (
        <Box key={index} sx={{ width: 310, marginRight: 0.5, my: 5 }}>
          {item ? (
            <img
              style={{ width: 310, height: 218 }}
              alt={item.title}
              src={item.src}
            />
          ) : (
            <Skeleton variant="rectangular" width={310} height={218} />
          )}

          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary">
                {item.channel}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function ShimmerUI() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Media loading />
    </Box>
  );
}