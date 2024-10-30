import { useState } from 'react'
 
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    Element:<Home/>
  }
]);

return (
  <>
 
    <RouterProvider router={router} />
  </>
);

export default App
