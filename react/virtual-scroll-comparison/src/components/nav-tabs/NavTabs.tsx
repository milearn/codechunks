import React, { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate, useLocation } from 'react-router';
import { clearData } from '../../store/actions/DataActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const tabsData = ['react-virtual', 'react-window'];
const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators({ clearData }, dispatch),
});
function NavTabs(props: any) {
  const { actions } = props;
  const currentRoute = useLocation().pathname.replace(/\//, '');
  const currValue = tabsData.indexOf(currentRoute);

  const [value, setValue] = useState(currValue > -1 ? currValue : 0);

  const navigate = useNavigate();
  const handleChange = (_event: SyntheticEvent<Element, Event>, newValue: any) => {
    actions.clearData();
    navigate('/' + tabsData[newValue]);

    //reloading the page to reset the redux data
    // window.location.pathname = '/' + tabsData[newValue];
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        {tabsData.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
}

export default connect(null, mapDispatchToProps)(NavTabs);
