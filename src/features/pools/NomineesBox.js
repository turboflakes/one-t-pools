import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Identicon from '@polkadot/react-identicon';
import polkadotJsSVG from '../../assets/polkadot_js_logo.svg';
// import { ReactComponent as SubscanSVG } from '../../assets/subscan_logo.svg';
import subscanSVG from '../../assets/subscan_logo.svg';

import { Spinner } from '../../components/Spinner'
import { useGetPoolNomineesQuery } from '../api/apiSlice'
import { Typography } from '@mui/material';

export const NomineesBox = ({poolId}) => {

  const { data, isFetching, isSuccess } = useGetPoolNomineesQuery(poolId)
  
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPolkadotJsExternal = (stash) => {
    // const {network} = this.props
    // const uri = encodeURI(`https://polkadot.js.org/apps/?rpc=${getNetworkWSS(network)}#/staking/query/${stash}`)
    const uri = encodeURI(`https://polkadot.js.org/apps/?rpc=wss://westend-rpc.polkadot.io#/staking/query/${stash}`)
    window.open(uri, '_blank')
  }

  const handleClickSubscanExternal = (stash) => {
    // const {network} = this.props
    // const uri = encodeURI(`https://${network}.subscan.io/validator/${stash}`)
    const uri = encodeURI(`https://westend.subscan.io/validator/${stash}`)
    window.open(uri, '_blank')
  }

  if (isFetching) {
    return (
      <section>
        <Spinner text="Loading..." />
      </section>
    )
  } else if (isSuccess) {
    
    return (
      <Box>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
        >
          <ListItemButton onClick={handleClick} disableRipple>
            <ListItemText primary={`Nominees (${data.nominees.length})`} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
              {!!data.nominees ? data.nominees.map((nominee, index) => 
                <ListItem sx={{ pl: 4 }} key={index}
                secondaryAction={
                  <Box component="span" sx={{ display: 'flex', flexDirection: 'row'}}>
                    <IconButton aria-label="Polkadot{.js}"
                      onClick={() => handleClickPolkadotJsExternal(nominee.stash)}>
                      {/* <PolkadotJsSVG sx={{ width: '26px', height: '26px' }} /> */}
                      <img src={polkadotJsSVG}  style={{ 
                        width: 26,
                        height: 26 }} alt={"github"}/>
                    </IconButton>
                    <IconButton aria-label="Subscan"
                      onClick={() => handleClickSubscanExternal(nominee.stash)}>
                      {/* <SubscanSVG sx={{ width: '26px', height: '26px' }}/> */}
                      <img src={subscanSVG}  style={{ 
                        width: 26,
                        height: 26 }} alt={"github"}/>
                    </IconButton>
                  </Box>
                }>
                  <ListItemAvatar>
                    <Identicon
                      value={nominee.stash}
                      size={32}
                      theme={'polkadot'} />
                  </ListItemAvatar>
                  <ListItemText primary={nominee.identity.substring(0, 32)} />
                </ListItem>)
                  : null}
            </List>
          </Collapse>
        </List>
        {!!data.nominees.last_nomination ? 
        <Typography variant="caption">
          Last Nomination: {data.nominees.last_nomination}
        </Typography> : null}
      </Box>
    )
  }
  return null
}
