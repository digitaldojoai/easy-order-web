"use client";
const defaultTheme = {
  mode: "light",
  direction: "ltr",
};
// const ThemeContext = createContext(defaultTheme);
// const ThemeUpdateContext = createContext(defaultTheme);

// export function useTheme() {
//   return useContext(ThemeContext);
// }

// export function useThemeUpdate() {
//   return useContext(ThemeUpdateContext);
// }

// const ThemeProvider = ({
//   children,
//   ...props
// }: {
//   children: React.ReactNode;
// }) => {
//   const defaultTheme = {
//     mode: "light",
//     direction: "ltr",
//   };
//   const [theme, setTheme] = useState<any>(defaultTheme);

//   const themeUpdate: {
//     mode: any;
//     direction: (value: any) => any;
//     reset: (e: any) => any;
//   } = {
//     mode: function (value) {
//       setTheme({ ...theme, mode: value });
//     },
//     direction: function (value) {
//       setTheme({ ...theme, direction: value });
//     },
//     reset: function (e) {
//       setTheme({
//         ...theme,
//         main: defaultTheme.direction,
//         mode: defaultTheme.mode,
//       });
//     },
//   };

//   const bodyClass = classNames({
//     "min-w-[320px] bg-slate-100 dark:bg-slate-900": true,
//   });
//   const htmlClass = classNames({
//     dark: theme.mode === "dark",
//   });

//   useLayoutEffect(() => {
//     document.body.setAttribute("dir", theme.direction);
//     document.documentElement.className = htmlClass;
//     document.body.className = bodyClass;
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
//   );
// };
// export default ThemeProvider;
