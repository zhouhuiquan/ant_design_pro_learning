import React from 'react';
import dva from 'dva';

import model from './model';
import App from './app';

const app = dva();

app.model(model);

app.router(() => <App />);

app.start('#app');
