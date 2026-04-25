import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import ChatBot from "./components/layout/ChatBot/ChatBot";

function App() {
  const location = useLocation();

  // Các path không cần header/footer
  const noLayoutPaths = [
    "/login",
    "/signup",
    "/forgot-password",
    "/oauth2-success",
  ];

  const hideLayout = noLayoutPaths.includes(location.pathname);

  return (
    <AuthProvider>
      {!hideLayout && <Header />}
      <AppRoutes />
      {!hideLayout && <Footer />}
      <ChatBot />
    </AuthProvider>
  );
}

export default App;
