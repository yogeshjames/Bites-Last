// 'use client';

// import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';
// import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import { useMemo } from 'react';

// export function CustomThemeProvider({ children }) {
//   const lightTheme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: 'light',
//           background: {
//             default: '#ffffff',
//           },
//           text: {
//             primary: '#000000',
//           },
//         },
//       }),
//     []
//   );

//   const darkTheme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: 'dark',
//           background: {
//             default: '#121212',
//           },
//           text: {
//             primary: '#ffffff',
//           },
//         },
//       }),
//     []
//   );

//   return (
//     <NextThemesProvider attribute="class">
//       <MuiThemeProvider
//         theme={(theme) => (theme === 'dark' ? darkTheme : lightTheme)}
//       >
//         <CssBaseline />
//         {children}
//       </MuiThemeProvider>
//     </NextThemesProvider>
//   );
// }
