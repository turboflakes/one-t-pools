import * as React from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getNetworkIcon } from '../../constants'
import { apiSlice } from '../../features/api/apiSlice'
import {
  changeTo,
  selectChain,
} from '../../features/chain/chainSlice';

function Header() {
	const history = useHistory()
	
	const dispatch = useDispatch();
	const selected = useSelector(selectChain);

	const handleChainSelection = (event, selectedChain) => {
		if (selectedChain === null) {
			return;
		}
		dispatch(changeTo(selectedChain));
		// Invalidate cached pools so it re-fetchs pools from selected chain
		dispatch(apiSlice.util.invalidateTags(['Pool']));
		history.push(`/${selectedChain}`)
  };

  return (
		<Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
			<ToggleButtonGroup
				value={selected}
				exclusive
				onChange={handleChainSelection}
				aria-label="text alignment"
			>
				<ToggleButton value="westend" aria-label="Westend Network">
					<img src={getNetworkIcon("westend")} style={{ 
						width: 32,
						height: 32 }} alt={"westend"}/>
					{selected === "westend" ? <Typography variant='h5' sx={{ paddingLeft: '8px'}}>Westend</Typography> : null}
				</ToggleButton>
				<ToggleButton value="kusama" aria-label="Kusama Network">
					<img src={getNetworkIcon("kusama")}  style={{ 
						width: 32,
						height: 32 }} alt={"kusama"}/>
					{selected === "kusama" ? <Typography variant='h5' sx={{ paddingLeft: '8px'}}>Kusama</Typography> : null}
				</ToggleButton>
				<ToggleButton value="polkadot" aria-label="Polkadot Network">
					<img src={getNetworkIcon("polkadot")}  style={{ 
						width: 32,
						height: 32 }} alt={"polkadot"}/>
					{selected === "polkadot" ? <Typography variant='h5' sx={{ paddingLeft: '8px'}}>Polkadot</Typography> : null}
				</ToggleButton>
			</ToggleButtonGroup>
		</Toolbar>
  );
}

export default Header;