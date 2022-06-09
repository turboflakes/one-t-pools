import * as React from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getNetworkIcon } from '../constants'
import { apiSlice } from '../features/api/apiSlice'
import polkadotJsSVG from '../assets/polkadot_js_logo.svg';
import {
	  setChainInfo,
  	changeTo,
  	selectChain,
} from '../features/chain/chainSlice';
import {
  selectAccount,
} from '../features/web3/web3Slice';


function useWeb3ChainInfo(api) {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    
    const fetchWeb3ChainInfo = async (api) => {
      return await api.registry.getChainProperties();
    }
    
    if (api) {
      fetchWeb3ChainInfo(api).then((info) => {
				dispatch(setChainInfo(info.toHuman()));
			});
		}
  }, [api, dispatch]);

  return [];
}

function Header({api}) {
	const history = useHistory()
	const dispatch = useDispatch();

	const selected = useSelector(selectChain);
	const web3Account = useSelector(selectAccount);
	useWeb3ChainInfo(api);

	const handleChainSelection = (ev, selectedChain) => {
		if (selectedChain === null) {
			return;
		}
		dispatch(changeTo(selectedChain));
		// Invalidate cached pools so it re-fetchs pools from selected chain
		dispatch(apiSlice.util.invalidateTags(['Pool']));
		history.replace(`/${selectedChain}`)
  };

  return (
		<AppBar position="static" color="transparent" sx={{ bgcolor: "#FFF"}} elevation={0}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1 }}>
				<ToggleButtonGroup
					// orientation="vertical"
					value={selected}
					exclusive
					onChange={handleChainSelection}
					aria-label="text alignment"
					sx={{ display: 'flex', alignItems: 'center', 	}}
				>
					{!!web3Account ? 
						<Box sx={{ mr: 3, p: 1, mt: 1, display: 'flex', alignItems: 'center', bgcolor: 'background.secondary', borderRadius: 3}}>
							<Typography variant="body2" color="text.secondary" sx={{ pl: 1, pr: 1 }} >{web3Account.meta.name}</Typography>
							<img src={polkadotJsSVG} style={{ 
								width: 26,
								height: 26 }} alt={web3Account.meta.name}/>
						</Box> : null}
					<ToggleButton value="polkadot" aria-label="Polkadot Network" sx={{ mr: 1, border: 0, '&.Mui-selected' : {borderRadius: 16}, '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {borderRadius: 16}}}>
						<img src={getNetworkIcon("polkadot")}  style={{ 
							width: 32,
							height: 32 }} alt={"polkadot"}/>
						{selected === "polkadot" ? <Typography variant='h5' sx={{ paddingLeft: '8px'}}>Polkadot</Typography> : null}
					</ToggleButton>
					<ToggleButton value="kusama" aria-label="Kusama Network" sx={{ mr: 1, border: 0, '&.Mui-selected' : {borderRadius: 16}, '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {borderRadius: 16}}}>
						<img src={getNetworkIcon("kusama")}  style={{ 
							width: 32,
							height: 32 }} alt={"kusama"}/>
						{selected === "kusama" ? <Typography variant='h5' sx={{ paddingLeft: '8px'}}>Kusama</Typography> : null}
					</ToggleButton>
					{/* <ToggleButton value="westend" aria-label="Westend Network" sx={{ mr: 1, border: 0, '&.Mui-selected' : {borderRadius: 16}, '&.MuiToggleButtonGroup-grouped:not(:last-of-type)': {borderRadius: 16}}}>
						<img src={getNetworkIcon("westend")} style={{ 
							width: 32,
							height: 32 }} alt={"westend"}/>
						{selected === "westend" ? <Typography variant='h5' sx={{ paddingLeft: '8px'}}>Westend</Typography> : null}
					</ToggleButton> */}
				</ToggleButtonGroup>
			</Toolbar>
		</AppBar>
  );
}

export default Header;