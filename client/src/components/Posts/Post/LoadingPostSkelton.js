import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import React from "react";

const LoadingPostSkelton = () => {
  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 240 }} animation="wave" variant="rectangular" />
        <CardContent>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingPostSkelton;
