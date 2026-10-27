import { useState } from 'react';

export const useThemeSwitcher = () => {
    const [is_dark_mode_on, setIsDarkModeOn] = useState(false);
    const toggleTheme = () => setIsDarkModeOn(prev => !prev);
    return { is_dark_mode_on, toggleTheme };
};

export default useThemeSwitcher;
