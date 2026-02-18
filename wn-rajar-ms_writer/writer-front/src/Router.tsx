import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import ArticleList from "./pages/ArticleList/ArticleList";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/articles" replace />, // En attendant d'avoir une vrai epage d'accueil
      },
      {
        path: "/articles",
        element: <ArticleList />,
      },
      {
        path: "/articles/create",
        element: <CreateArticle />,
      },
      {
        path: "/articles/:id/edit",
        element: <EditArticle />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
