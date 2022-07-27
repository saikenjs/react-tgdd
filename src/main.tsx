import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import { ValidateMessages } from 'rc-field-form/lib/interface';
import { App } from './App';

import 'antd/dist/antd.css';
import './styles/index.less';

const validateMessages: ValidateMessages = {
  required: '${label} is required field.',
  string: {
    min: '${label} must be at least ${min} characters',
  },
};

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <ConfigProvider form={{ validateMessages }}>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </ConfigProvider>
  </React.StrictMode>,
);
