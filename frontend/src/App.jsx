import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

function App() {
  const location = useLocation();

  // Các path không cần header/footer
  const noLayoutPaths = ["/login", "/signup", "/forgot-password"];
  const hideLayout = noLayoutPaths.includes(location.pathname);
  return (
    <>
      {!hideLayout && <Header />}
      <AppRoutes />
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
