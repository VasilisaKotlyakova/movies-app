import React from 'react';
import ReactClient from 'react-dom/client';

import App from './components/app';

const container = document.getElementById('root');
const root = ReactClient.createRoot(container);
root.render(<App />);

