//Components
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Route } from "./components/Route.jsx";

//Pages
import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { ContactPage } from "./pages/Contact.jsx";
import { AboutPage } from "./pages/About.jsx";
import { NotFoundPage } from "./pages/404.jsx";

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="*" component={NotFoundPage} />
      <Footer />
    </>
  );
}

export default App;
