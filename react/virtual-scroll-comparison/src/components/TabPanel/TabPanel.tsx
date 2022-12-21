import React from 'react';

import './TabPanel.css';

function TabPanel(props: any) {
  const { children, value, index, isExpanded, setIsExpanded, ...other } = props;
  const changeWidth = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className={isExpanded ? 'Tab-Content-Expanded' : 'Tab-Content-Collapsed'}
      {...other}
    >
      <span className={isExpanded ? 'icon-collapse' : 'icon-expand'} onClick={changeWidth} />
      {value === index && children}
    </div>
  );
}

export default TabPanel;
