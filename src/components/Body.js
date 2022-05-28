import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { PoolBox } from '../features/pools/PoolBox'
import onet from '../assets/onet.svg';
import { getNetworkName, getNetworkPoolId } from '../constants'
import {
  selectChain,
} from '../features/chain/chainSlice';


function Body({api}) {
	const selected = useSelector(selectChain);
	
  return (
		<main style={{ background: "linear-gradient(180deg, #FFF, #F1F1F0)" }} >
			<Box
				sx={{
					// bgcolor: 'background.paper',
					pt: 8,
					pb: 6,
				}}
			>
				<Container maxWidth="lg">
					<Box sx={{ display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: `8px 0 64px 0`}}>
						<Box >
							<img src={onet} style={{width: 288, height: 288 }} alt={"logo"}/>
						</Box>
						<Box>
							<Typography
								component="h1"
								variant="h2"
								align="left"
								color="text.primary"
								gutterBottom
							>
								<div style={{fontSize: "1.75rem"}}>Welcome to</div>
								ONE-T Nomination Pools
							</Typography>
							<Typography variant="subtitle1" align="left" color="text.primary">
							Join a pool and share in staking rewards from the <br />top-best <Link href="https://wiki.polkadot.network/docs/thousand-validators" 
								target="_blank" rel="noreferrer" color="inherit" 
								sx={{
									textDecoration: "underline",
									textDecorationThickness: 4,
									'&:hover': {
										textDecorationThickness: 4,
										// textDecorationColor: 'primary.main',
									}
								}}>TVP</Link> validators of <b>{getNetworkName(selected)}</b> - curated by ONE-T.
							</Typography>
						</Box>
					</Box>

					{/* <Typography variant="subtitle1" align="center" color="text.primary">
					Join a pool and share in staking rewards from the <br />top-best <Link href="https://wiki.polkadot.network/docs/thousand-validators" 
						target="_blank" rel="noreferrer" color="inherit" 
						sx={{
							textDecoration: "underline",
							textDecorationThickness: 4,
							'&:hover': {
								textDecorationThickness: 4,
								// textDecorationColor: 'primary.main',
							}
						}}>TVP</Link> validators of <b>{getNetworkName(selected)}</b> - curated by ONE-T.
					</Typography> */}
				</Container>

			</Box>
			<Container sx={{ py: 4 }} maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<PoolBox poolId={getNetworkPoolId(selected, 0)} api={api} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<PoolBox poolId={getNetworkPoolId(selected, 1)} api={api} extra="Validators with a lower commission are scored higher. " />
					</Grid>
				</Grid>
			</Container>
		</main>
  );
}

export default Body;