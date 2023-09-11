import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BookDetails, Home, EditBook, CreateBook } from './pages';

const router = createBrowserRouter([
  {path:'/books', element:<Home />},
  {path:'/books/details/:id', element:<BookDetails />},
  {path:'/books/edit/:id', element:<EditBook />},
  {path:'/books/create', element:<CreateBook />}
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
