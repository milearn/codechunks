import React, { Suspense, ReactElement } from 'react';
import { useRoutes, RouteObject, Navigate } from 'react-router-dom';

import { SpikePerformance } from '../spike-performance/SpikePerformance';
import NavTabs from '../nav-tabs/NavTabs';
import Tabs from '../Tabs/Tabs';

import './App.css';

const GridVirtualizerFixed = React.lazy(
  () => import(/* webpackChunkName: "ReactVirtual" */ '../../templates/react-virtual')
);
const ReactWindowGridFixed = React.lazy(
  () => import(/* webpackChunkName: "ReactWindow" */ '../../templates/react-window')
);

function App(): ReactElement {
  const routes: RouteObject[] = [
    {
      path: '/',
      children: [
        {
          index: true,
          element: [<Navigate to="react-virtual" />],
        },
        {
          path: 'react-virtual',
          element: [<GridVirtualizerFixed />],
        },
        {
          path: 'react-window',
          element: [<ReactWindowGridFixed />],
        },
      ],
    },
  ];

  const element = useRoutes(routes);
  return (
    <div className="Container">
      <header className="App-header">
        <SpikePerformance key={Math.random()} />
        <h2 className="">Virtual Scrolling</h2>
        <NavTabs />
      </header>
      <div className="App">
        <Suspense fallback={<div>Loading</div>}>
          <Tabs element={element} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
