import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '@src/style.css';

const App: React.FC = () => {
  return <div>Hello React-Typescript-Boilerplate</div>;
};

ReactDOM.render(<App />, document.getElementById('app'));
