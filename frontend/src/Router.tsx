import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthCheck } from './Auth/AuthCheck';
import { Auth } from './Auth/Auth';
import { Lobby } from './Lobby/Lobby';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AuthCheck />}>
      <Route index element={<Lobby />} />
      <Route path='/auth' element={<Auth />} />
    </Route>
  )
);

export function Router() {
  return <RouterProvider router={router} />;
}
