import { useState, useEffect } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import Router from "next/router";
import MainBar from "@/components/FrontModules/appbar";
import { PaletteMode } from "@mui/material";
import "../styles/globals.css";

import { darken, lighten } from "@mui/material";
import * as muiColors from "@mui/material/colors";

import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useScrollTrigger } from "@mui/material";
import Grow from "@mui/material/Grow";
import ErrorBoundary from "@/components/BackModules/errorhandling";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { CheckRounded } from "@mui/icons-material";
import Cookies from "js-cookie";
import Head from "next/head";
const MyThemeProvider = ({ children }) => {
  const prefersDarkMode = true;
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(null);
  const [showBackdrop, setShowBackdrop] = useState(false);

  useEffect(() => {
    const fetchFavoriteColor = async () => {
      try {
        const response = await fetch("/api/users/checkcolor");
        if (response.ok) {
          const data = await response.json();
          const { favoriteColor } = data;

          const color = muiColors[favoriteColor] || muiColors.orange; // Use the color from muiColors or fallback to orange

          const theme = createTheme({
            palette: {
              primary: {
                main: color[500],
                back: prefersDarkMode ? color[200] : color[800],
              },
              mode: prefersDarkMode ? "dark" : "light",
            },
            components: {
              MuiButton: {
                styleOverrides: {
                  root: {
                    borderRadius: "30px",
                  },
                },
              },
              MuiPaper: {
                styleOverrides: {
                  root: {
                    backgroundColor: prefersDarkMode
                      ? darken(color[200], 0.92)
                      : lighten(color[500], 0.6),
                  },
                },
              },
            },
          });

          setTheme(theme);
        } else {
          throw new Error("Failed to retrieve user color");
        }
      } catch (error) {
        console.error("Error retrieving user color:", error);
      } finally {
        setLoading(false);
      }
    };
    const timeout = setTimeout(() => {
      setShowBackdrop(true);
    }, 3000);
    fetchFavoriteColor();
    return () => clearTimeout(timeout);
  }, []);

  if (loading || !theme) {
    // Show loading screen while fetching the color
    return (
      <>
        {!theme || showBackdrop ? (
          <Backdrop open={true} style={{ zIndex: 9999 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Backdrop open={true} style={{ zIndex: 9999 }}>
            <Stack alignItems="center" justifyContent="center" spacing={4}>
              <Avatar
                sx={{ width: 69, height: 92, imageRendering: "pixelated" }}
                variant="rounded"
                src="Error.png"
              ></Avatar>
              <Typography gutterBottom variant="h6" sx={{ maxWidth: "88vw" }}>
                Something went wrong with the color system, please wait or reset
                the color, if this error is still present please refresh the
                page or contact an administrator.
              </Typography>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ alignContent: "center", maxWidth: "88vw" }}
              >
                Debugging info:
                <br />
                <br />
                L0001: {loading ? loading.toString() : "Nothing"} <br />
                T0001:{" "}
                <code
                  style={{
                    maxWidth: "70%",
                    display: "inline-block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {theme ? JSON.stringify(theme) : "ERROR"}
                </code>{" "}
                <br />
                L0002:
                {theme && theme.palette.mode
                  ? theme.palette.mode.toString()
                  : "ERROR"}{" "}
                <br />
                T0002:{" "}
                {theme && theme.palette.primary.main
                  ? theme.palette.primary.main.toString()
                  : "ERROR"}{" "}
                <br />
                T0003:
                {theme && theme.palette.primary.back
                  ? theme.palette.primary.back.toString()
                  : "ERROR"}
                <br />
              </Typography>
            </Stack>
          </Backdrop>
        )}
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
};

function ScrollTop(props) {
  const { children, window } = props;
  const onScroll = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const [showButton, setShowButton] = useState(false);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleClick = (event) => {};

  return (
    <Grow in={onScroll} style={{ transformOrigin: "0 1 1" }}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Grow>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function MyApp({ Component, pageProps, mode = PaletteMode, ipAddress }) {
  const [isOnline, setIsOnline] = useState(true);

  const [showCookieDisclaimer, setShowCookieDisclaimer] = useState(true);

  const handleCookieDisclaimerClose = () => {
    setShowCookieDisclaimer(false);
    Cookies.set("cookieDisclaimerAccepted", true, { expires: 365 });
  };

  useEffect(() => {
    const cookieDisclaimerAccepted = Cookies.get("cookieDisclaimerAccepted");
    if (cookieDisclaimerAccepted) {
      setShowCookieDisclaimer(false);
    }
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const currentTheme = useTheme();
  const toolbarStyle = {
    transition: "all 0.5s",
    transform: showAnimation ? "translateY(0)" : "translateY(-100%)",
    backgroundColor: "#f0f0f0", // Replace with your desired background color
  };
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
    };

    const stopLoading = () => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Head>
        <title>Jtooly</title>
        <meta name="title" content="Jtooly" />
        <meta name="description" content="Uhh random website lmao" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="http://196.148.141.88.rev.sfr.net:3000"
        />
        <meta property="og:title" content="Jtooly" />
        <meta property="og:description" content="Juicey's website :D" />
        <meta property="og:image" content="/public/Jtooly.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="http://196.148.141.88.rev.sfr.net:3000"
        />
        <meta property="twitter:title" content="Jtooly" />
        <meta
          property="twitter:description"
          content="Uhh random website lmao"
        />
        <meta property="twitter:image" content="/public/Jtooly.png" />
      </Head>
      <MyThemeProvider>
        <SessionProvider>
          <ErrorBoundary>
            <MainBar style={toolbarStyle} />
          </ErrorBoundary>
          <Paper
            variant="outlined"
            color="primary"
            square
            style={{ filter: isLoading ? "blur(8px)" : "none" }}
            className="content"
            sx={{ backgroundColor: currentTheme.palette.primary.back }}
          >
            <Snackbar open={!isOnline}>
              <Alert severity="error">
                You are offline. Please check your internet connection.
              </Alert>
            </Snackbar>
            <ErrorBoundary>
              <Snackbar
                open={showCookieDisclaimer}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={60000000}
                sx={{ borderRadius: "16px" }}
              >
                <Alert
                  sx={{ borderRadius: "16px" }}
                  severity="info"
                  action={
                    <>
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        href="https://google.com"
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCookieDisclaimerClose}
                      >
                        <CheckRounded fontSize="small" />
                      </IconButton>
                    </>
                  }
                >
                  This website uses cookies to enhance the user experience
                  (Authentification Purposes only). By using this website, you
                  consent to the use of cookies
                  <br></br>
                  Would you like to continue?
                </Alert>
              </Snackbar>
              {isLowEnd ? (
                <Snackbar open={true}>
                  <Alert severity="warning">
                    Your device is old, some part of the website may or may not
                    work.
                  </Alert>
                </Snackbar>
              ) : null}
            </ErrorBoundary>
            <ErrorBoundary>
              <GoogleAnalytics trackPageViews gaMeasurementId="G-H0STNNX13D" />
              <Component {...pageProps} />
            </ErrorBoundary>
            <ErrorBoundary>
              <ScrollTop {...pageProps}>
                <Fab
                  onClick={goToTop}
                  size="small"
                  aria-label="scroll back to top"
                >
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
            </ErrorBoundary>
          </Paper>
          <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </SessionProvider>
      </MyThemeProvider>
    </ErrorBoundary>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(["light", "dark"]),
};

export default MyApp;
