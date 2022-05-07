import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { Auth, Page404, DashboardPage } from "./pages";
import { Navbar, Footer } from "./components";
import { hasTokenExpired } from "./utilities"
import { logout, authReset } from './features/auth/authSlice';

function App() {
  const [colorScheme, setColorScheme] = useState(JSON.parse(localStorage.getItem('mantine-color-scheme')) || 'light');
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("mantine-color-scheme", JSON.stringify(colorScheme));  // Check local storage
    if (user !== null || user !== undefined) {
      if (hasTokenExpired(user)) {
        dispatch(logout())
        dispatch(authReset())
        navigate('/')
        console.log(
          "%cExpired token. Please login again.",
          "color: yellow; font-size: 35px; background-color: red;"
        );
      }
    }
  }, [colorScheme, dispatch, navigate, user]);

  const toggleColorScheme = () => {
    colorScheme === "light" ? setColorScheme("dark") : setColorScheme("light")
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]]); // Hotkey to trigger theme mode

  const theme = {
    colorScheme,
    loader: 'oval',
    fontSizes: { xxs: 12, xs: 13, sm: 14, md: 16, lg: 18, xl: 20, xxl: 24 },
    spacing: { xxs: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 64 },
    Container: {
      sizes: { xs: 540, sm: 720, md: 960, lg: 1140, xl: 1500, },
    },
    colors: {
      maroon: ['#cc9999', '#c08080', '#b36666', '#a64d4d', '#993333', '#8d1919', '#800000', '#730000', '#660000', '#5a0000']
    }
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme}>
        <NotificationsProvider>

          <>
            <Helmet>
              <title>SNNHS Attendance System</title>
            </Helmet>
            <Navbar user={user} />
            {user ?
              <Routes>
                <Route path="/" element={<DashboardPage colorScheme={colorScheme} />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
              :
              <Auth />
            }
            <Footer />
          </>

        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
