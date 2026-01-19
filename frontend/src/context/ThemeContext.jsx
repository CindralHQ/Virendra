import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const THEMES = ["virendra"];
const THEME_STORAGE_KEY = "selected-theme";

const ThemeContext = createContext(null);

const getStoredTheme = () => {
  if (typeof window === "undefined") return THEMES[0];
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored && THEMES.includes(stored) ? stored : THEMES[0];
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const stored = getStoredTheme();
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", stored);
      document.documentElement.dataset.theme = stored;
      document.body?.setAttribute("data-theme", stored);
    }
    return stored;
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.dataset.theme = theme;
    document.body?.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      themes: THEMES,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
