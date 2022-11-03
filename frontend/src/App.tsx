import * as ReactQuery from '@tanstack/react-query';
import * as ReactQueryDev from '@tanstack/react-query-devtools';
import { Router } from './Router';

const queryClient = new ReactQuery.QueryClient();

function App() {
  return (
    <ReactQuery.QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDev.ReactQueryDevtools initialIsOpen={false} />
    </ReactQuery.QueryClientProvider>
  );
}

export default App;
