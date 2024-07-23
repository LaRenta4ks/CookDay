import React from 'react'
import ReactDOM from 'react-dom/client'
import './output.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Detail from './components/RecipeDetail.tsx';
import App from './App.tsx';
import Recipeform from './components/Recipeform.tsx';
import './components/Recipeform.css'
/*import Favorites from './components/Favorites.tsx';
import './components/Favorites.css'
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
 {
    path: "/recipeform",
    element: <Recipeform />,
  }, /*
{
  path: "/favorites",
  element:<Favorites />
},*/
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
