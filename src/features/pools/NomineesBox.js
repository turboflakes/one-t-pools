import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ListSubheader from '@mui/material/ListSubheader';
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
import subscanSVG from '../../assets/subscan_logo.svg';
import { Spinner } from '../../components/Spinner'
import { useGetPoolNomineesQuery } from '../api/apiSlice'
import {
  selectChain,
} from '../../features/chain/chainSlice';
import {
  getNetworkWSS,
} from '../../constants';


export const NomineesBox = ({poolId}) => {

  const { data, isFetching, isSuccess } = useGetPoolNomineesQuery(poolId)
  const selectedChain = useSelector(selectChain);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPolkadotJsExternal = (stash, chain) => {
    const uri = encodeURI(`https://polkadot.js.org/apps/?rpc=${getNetworkWSS(chain)}#/staking/query/${stash}`)
    window.open(uri, '_blank')
  }

  const handleClickSubscanExternal = (stash, chain) => {
    const uri = encodeURI(`https://${chain}.subscan.io/validator/${stash}`)
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
          component="nav">
          <ListItemButton onClick={handleClick} disableRipple>
            <ListItemText primary={`Nominees (${data.nominees.length})`} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding subheader={
            !!data.last_nomination ? 
              <ListSubheader variant="div" sx={{m: 0, color: "text.primary", textAlign: "right"}}>
                last nomination {moment.unix(data.last_nomination.ts).utc().format("DD/MM/YYYY")} finalized at block <Link href={`https://${selectedChain}.subscan.io/extrinsic/${data.last_nomination.extrinsic_hash}`}
                target="_blank" rel="noreferrer" color="inherit" 
                sx={{
                  textDecoration: "underline",
                  textDecorationThickness: 2,
                  '&:hover': {
                    textDecorationThickness: 2,
                    // textDecorationColor: 'primary.main',
                  }
                }}>#{data.last_nomination.block_number}</Link> 
              </ListSubheader> : null }>
              {!!data.nominees ? data.nominees.map((nominee, index) => 
                <ListItem sx={{ pl: 4 }} key={index}
                secondaryAction={
                  <Box component="span" sx={{ display: 'flex', flexDirection: 'row'}}>
                    <IconButton aria-label="Polkadot{.js}"
                      onClick={() => handleClickPolkadotJsExternal(nominee.stash, selectedChain)}>
                      <img src={polkadotJsSVG}  style={{ 
                        width: 26,
                        height: 26 }} alt={"github"}/>
                    </IconButton>
                    <IconButton aria-label="Subscan"
                      onClick={() => handleClickSubscanExternal(nominee.stash, selectedChain)}>
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
      </Box>
    )
  }
  return null
}