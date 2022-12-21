/* @ts-ignore */

import { useEffect, useState } from 'react';
import Stats from 'stats.js';
import './SpikePerformance.css';
export function SpikePerformance() {
  const [reset, setReset] = useState(false);
  const [stop, setStop] = useState(false);
  useEffect(() => {
    const panels = [3, 2, 1, 0];
    const width = 80;
    const stats: Stats[] = [];
    panels.forEach((panel, index) => {
      const stat = new Stats();
      // custom implementation for counting DOM nodes in a list
      if (panel >= 3) {
        var panelBox = stat.addPanel(new Stats.Panel('Node', '#ff8', '#221'));
        if (!stop) {
          captureMetrics(stat, panel, panelBox);
        }
      }
      stat.showPanel(panel);
      stat.dom.style.left = '';
      stat.dom.style.right = `${width * index}px`;
      document.body.appendChild(stat.dom);
      stats.push(stat);
    });
    requestAnimationFrame(function loop() {
      stats.forEach((s) => s.update());
      if (!stop) {
        requestAnimationFrame(loop);
      }
    });
  }, [reset, stop]);

  const handleReset = () => {
    setReset(!reset);
  };
  const handleStop = () => {
    setStop(!stop);
  };
  return (
    <>
      <button className="Reset" onClick={handleReset}>
        Reset
      </button>
      <button className="Stop" onClick={handleStop}>
        {stop ? 'Start' : 'Stop'}
      </button>
    </>
  );
}
function captureMetrics(stat: Stats, panel: any, panelBox: any) {
  switch (panel) {
    case 3:
    default:
      showDOMNodesCount(stat, panel, panelBox);
  }
}

function showDOMNodesCount(stat: Stats, panel: any, panelBox: any) {
  const domCount = window?.document?.querySelectorAll('img')?.length;

  // Max value is 100
  panelBox.update(domCount, 100);
  requestAnimationFrame(() => showDOMNodesCount(stat, panel, panelBox));
}
