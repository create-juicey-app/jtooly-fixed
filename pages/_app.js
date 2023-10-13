import {useState, useEffect } from "react";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Backdrop,
  Alert,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import Router from "next/router";
import MainBar from "@/components/FrontModules/appbar";
import "../styles/globals.css";

import { darken, lighten } from "@mui/material";
import * as muiColors from "@mui/material/colors";
import { PaletteMode } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useScrollTrigger } from "@mui/material";
import Grow from "@mui/material/Grow";
import ErrorBoundary from "@/components/BackModules/errorhandling";
import { CheckRounded } from "@mui/icons-material";
import Cookies from "js-cookie";
import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";

// const Snackbar = lazy(() => import("@mui/material/Snackbar"));
// const Alert = memo((props) => <Alert {...props} />);

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
      <Backdrop open={true} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
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

const MyApp = ({ Component, pageProps, mode = PaletteMode, ipAddress }) => {
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
          <MainBar style={toolbarStyle} />
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
            <Component {...pageProps} />
            <ScrollTop {...pageProps}>
              <Fab
                onClick={goToTop}
                size="small"
                aria-label="scroll back to top"
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>

          </Paper>
          <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          
        </SessionProvider>
      </MyThemeProvider>
    </ErrorBoundary>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(["light", "dark"]),
};

export default MyApp;