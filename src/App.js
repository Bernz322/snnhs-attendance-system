import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';

import { Auth, Page404, DashboardPage } from "./pages";
import { Navbar, Footer } from "./components";
import { Helmet } from "react-helmet";

function App() {
  const [colorScheme, setColorScheme] = useState(JSON.parse(localStorage.getItem('mantine-color-scheme')) || 'light');

  useEffect(() => {
    localStorage.setItem("mantine-color-scheme", JSON.stringify(colorScheme));  // Check local storage
  }, [colorScheme]);

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

  /**
 * Ensures that everytime we switch to another route, we will always be on the top page
 * https://v5.reactrouter.com/web/guides/scroll-restoration
 * https://stackoverflow.com/questions/70193712/how-to-scroll-to-top-on-route-change-with-react-router-dom-v6
 * @returns {void}
 */
  // const ScrollToTop = () => {
  //   const { pathname } = useLocation();
  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, [pathname]);

  //   return null;
  // }
  const [user, setUser] = useState(true);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme}>
        <NotificationsProvider>

          <>
            <Helmet>
              <title>SNNHS Attendance System</title>
            </Helmet>
            <Navbar user={user} />
            {/* <ScrollToTop /> */}
            {user ?
              <Routes>
                <Route path="/" element={<DashboardPage colorScheme={colorScheme} />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
              :
              <Auth setUser={setUser} />
            }
            <Footer />
          </>

        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
