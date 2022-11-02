import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Auth } from './Auth/Auth';
import { Lobby } from './Lobby/Lobby';
import { Root } from './Root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Lobby />} />
      <Route path='/auth' element={<Auth />} />
    </Route>
  )
);

export function Router() {
  return <RouterProvider router={router} />;
}
