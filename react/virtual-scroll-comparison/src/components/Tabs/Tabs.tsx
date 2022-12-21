import React, { useState, JSXElementConstructor, cloneElement, ReactElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabPanel from '../TabPanel/TabPanel';
import { DataActions } from '../../store/actions';

import './Tabs.css';

const mapStateToProps = (state: any) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({ ...DataActions }, dispatch),
});

function a11yProps(index: Number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
interface VerticalTabsProps {
  actions: any;
  data: any;
  element: ReactElement<any, string | JSXElementConstructor<any>> | null;
}

const VerticalTabs = (props: VerticalTabsProps) => {
  const { actions, data } = props;
  const [value, setValue] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const children = props.element?.props?.value?.outlet?.props?.children || [];

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const picsumTabProps = {
    dataSource: 'PICSUM',
    data: data?.picsumResults,
    isExpanded,
    fetchAction: actions.fetchPicsumDataList,
    isLoading: data?.loading,
  };

  const tenorTabProps = {
    dataSource: 'TENOR',
    data: data?.tenorResults,
    isExpanded,
    fetchAction: actions.fetchTenorDataList,
    isLoading: data?.loading,
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', height: '100%' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 2, borderColor: 'divider' }}
      >
        <Tab label="Picsum" {...a11yProps(0)} />
        <Tab label="Tenor" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
        {cloneElement(children[0], picsumTabProps)}
      </TabPanel>
      <TabPanel value={value} index={1} isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
        {cloneElement(children[0], tenorTabProps)}
      </TabPanel>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTabs);
