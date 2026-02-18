import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ArticleList from "./components/ArticleList/ArticleList";
import Article from "./components/Article/Article";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/:id" element={<Article />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}


export default App;
