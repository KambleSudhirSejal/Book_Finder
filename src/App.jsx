import React,{useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Hero from './components/Hero';
import Footer from './components/Footer';

const App = () => {

   const [searchQuery, setSearchQuery] = useState("best_sellers");
   const[theme,setTheme] = useState("dark")

   //apply theme to html element 
   useEffect(()=>{
    if(theme === 'dark'){
      document.documentElement.classList.add("dark")
    }else{
      document.documentElement.classList.remove("dark")
    }
   },[theme]);

   const toggleTheme =() =>{
    setTheme((prev)=>(prev === "dark" ? "light" : "dark"));
   }


  return (
    <>
      <div className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
        <Navbar handleSearch={(term) => setSearchQuery(term)} theme={theme} toggleTheme={toggleTheme}/>
        <Banner theme={theme} toggleTheme={toggleTheme}/>
        <Hero searchQuery={searchQuery} theme={theme} toggleTheme={toggleTheme} />
      </div>
      <Footer theme={theme} toggleTheme={toggleTheme}  />
    </>
  );
}

export default App
