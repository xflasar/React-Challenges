import { useState } from 'react'
import './App.css'
import { Calculator } from './components/calculator'

function App() {
  const [darkModeTheme, setDarkModeTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)') ? true : false)

  const handleToogleTheme = (state: boolean) => {
    setDarkModeTheme(state)
    const bodyElement = document.querySelector('body') as HTMLElement | null;

    if (bodyElement) {
      bodyElement.style.backgroundColor = state ? '#242424' : '#fff';
    }
  }

  return (
    <>
      <div className={ darkModeTheme ? 'theme-button-holder dark-mode' : 'theme-button-holder light-mode'}>
        <button type='button' className='theme-button' onClick={() => handleToogleTheme(!darkModeTheme)}>
          <img src={darkModeTheme ?  '/assets/light-theme.png': '/assets/dark-theme.png'} alt={darkModeTheme ? 'Switch to light theme.' : 'Switch to dark theme.'} />
        </button>
      </div>
      <Calculator darkMode={darkModeTheme}/>
    </>
  )
}

export default App
