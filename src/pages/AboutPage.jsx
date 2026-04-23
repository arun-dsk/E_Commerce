import Navbar from '../Components/Navbar/Navbar'
import { ThemeProvider } from '../Context/ThemeContext'
import Footer from '../Components/Footer/Footer'

const AboutPage = () => {
  
  return (
    <ThemeProvider>
      <Navbar />
      About page
      <Footer/>
    </ThemeProvider>
  )
}

export default AboutPage;