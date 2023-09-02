import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

interface Review {
  id: number;
  name: string;
  text: string;
}
interface Props {
  reviews: Review[];
}

export default function ReviewsCarousel({ reviews }: Props) {
  const [index, setIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const clonedReviews = [...reviews, ...reviews.slice(0, 4)];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  useEffect(() => {
    if (index === reviews.length - 1) {
      setTransitionEnabled(false);
      setTimeout(() => {
        setIndex(reviews.length);
      }, 500);
      setTimeout(() => {
        setIndex(0);
        setTransitionEnabled(true);
      }, 600);
    }
  }, [index, reviews.length]);

  return (
    <Box sx={{ my: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Reviews
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "80%" }}>
          <Grid
            container
            spacing={2}
            sx={{ overflowX: "hidden", flexWrap: "nowrap" }}
          >
            {clonedReviews.map((review, i) => (
              <Grid item xs={2} sm={2} key={review.id}>
                <Card
                  sx={{
                    transform: `translateX(${(i - index) * 100}%)`,
                    transition: transitionEnabled ? "transform 0.5s" : "none",
                    width: "300px",
                    height: "100px",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{review.name}</Typography>
                      <Typography variant="body2">"{review.text}"</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
