import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import homeImg from "../assets/homeIntroImg.svg";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ReviewsCarousel from "../components/ReviewCarousel";

interface Article {
  id: number;
  title: string;
  description: string;
}

interface Review {
  id: number;
  name: string;
  text: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Article 1",
    description: "This is the description of article 1.",
  },
  {
    id: 2,
    title: "Article 2",
    description: "This is the description of article 2.",
  },
  {
    id: 3,
    title: "Article 3",
    description: "This is the description of article 3.",
  },
  {
    id: 4,
    title: "Article 4",
    description: "This is the description of article 4.",
  },
];

const reviews: Review[] = [
  {
    id: 1,
    name: "John Doe",
    text: "This is a great platform for learning!",
  },
  {
    id: 2,
    name: "Jane Doe",
    text: "I love the courses on this website!",
  },
  {
    id: 3,
    name: "John Doe",
    text: "This is a great platform for learning!",
  },
  {
    id: 4,
    name: "Jane Doe",
    text: "I love the courses on this website!",
  },
  {
    id: 5,
    name: "John Doe",
    text: "This is a great platform for learning!",
  },
  {
    id: 6,
    name: "Jane Doe",
    text: "I love the courses on this website!",
  },
  {
    id: 7,
    name: "John Doe",
    text: "This is a great platform for learning!",
  },
  {
    id: 8,
    name: "Doe",
    text: "I love the courses on this website!",
  },
];

const LandingTheme = createTheme({
  palette: {
    primary: {
      main: "#e7005e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#20183e",
      contrastText: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-root:hover": {
            backgroundColor: "#ff1675",
          },
          "&.navbar-btn:hover": {
            backgroundColor: "#585fa2 !important",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h5: {
          color: "white",
        },
        h4: {
          color: "white",
        },
        h2: {
          color: "white",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#20183e !important",
        },
      },
    },
  },
});

function Landing() {
  // const theme = useTheme();
  return (
    <ThemeProvider theme={LandingTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h2" gutterBottom>
                  Welcome to My Courses
                </Typography>
                <Typography variant="h5" gutterBottom>
                  The best place to learn and grow
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Link to="/courses">
                    <Button variant="contained" size="large">
                      Browse Courses
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={homeImg}
                alt="Learning and education banner"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 8 }}>
          <ReviewsCarousel reviews={reviews} />

          {/* <Typography variant="h4" align="center" gutterBottom>
            Reviews
          </Typography>
          <Grid container spacing={2}>
            {reviews.map((review) => (
              <Grid item xs={4} sm={2} key={review.id}>
                <Card sx={{ height: "100%" }}>
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
          </Grid> */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Landing;
