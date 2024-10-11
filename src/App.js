import './App.css';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { RouterProvider, createBrowserRouter} from 'react-router-dom'


const Layout  = () =>{
  <>
  </>
}

const router = createBrowserRouter([
 
      {
        index:true,
        element :<Home/>
      },
      {
        path:"/dashboard",
        element :<Dashboard/>
      }

])
function App() {
  return (
    <>
     <RouterProvider router={router } />
    </>
  );
}

export default App;
