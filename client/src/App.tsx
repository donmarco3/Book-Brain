import { useEffect, useState } from 'react';
import api from './api/client';

function App() {
  const [status, setStatus] = useState<string>('loading...');

  useEffect(() => {
    api.get('/api/health')
      .then((res) => setStatus(res.data.status))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div>
      <h1>Book Brain</h1>
      <p>API status: {status}</p>
    </div>
  );
}

export default App;
