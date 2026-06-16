import { useEffect } from 'react'

const ForceTheme = ({ theme }) => {
  useEffect(() => {
    // Lock the theme to 'light' by setting data attribute
    // The ThemeToggle component checks for this
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme-lock', 'light')
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
    return () => {
      document.documentElement.removeAttribute('data-theme-lock')
    }
  }, [theme])
  return null
}

export default ForceTheme