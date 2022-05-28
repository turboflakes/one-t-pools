import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { PoolBox } from '../features/pools/PoolBox'
import onet from '../assets/onet.svg';
import { getNetworkName, getNetworkPoolId } from '../constants'
import {
  selectChain,
} from '../features/chain/chainSlice';


function Body({api}) {
	const selected = useSelector(selectChain);
	
	const handleExt = () => {
		window.open('https://wiki.polkadot.network/docs/thousand-validators', '_blank')
	}

  return (
		<main style={{ background: "linear-gradient(180deg, #FFF, #F1F1F0)" }} >
			<Box
				sx={{
					// bgcolor: 'background.paper',
					pt: 8,
					pb: 6,
				}}
			>
				<Container maxWidth="lg" sx={{}}>
					<Box sx={{ minHeight: '60vh', display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: `8px 0 64px 0`}}>
						{/* <Box > */}
							<img src={onet} style={{width: 288, height: 288 }} alt={"logo"}/>
						{/* </Box> */}
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
				</Container>

			</Box>
			<div style={{ backgroundColor: '#0B1317'}}>
				<Container sx={{ py: 20 }} maxWidth="lg">
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6}>
							<PoolBox poolId={getNetworkPoolId(selected, 0)} api={api} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<PoolBox poolId={getNetworkPoolId(selected, 1)} api={api} extra="Validators with a lower commission are scored higher. " />
						</Grid>
					</Grid>
				</Container>
			</div>
			<Container sx={{ py: 20 }} maxWidth="lg">
				<Grid container>
				<Grid item xs={12} sm={8}>
            <Typography
							variant="h3"
							color="textPrimary"
							align="left"
							paragraph
            >What is ONE-T</Typography>
            <Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
            >
            ONE-T is a validator performance report bot for the <i>Polkadot</i> and <i>Kusama</i> networks with special focus on the <b>One T</b>housand validator programme. <IconButton 
                onClick={() => handleExt()}
                  color="inherit"
                  size="small"
                  aria-label="Menu">
                  <ArrowRightIcon color="inherit" />
                </IconButton>
            </Typography>

						<Typography
							variant="h5"
							color="textPrimary"
							align="left"
							paragraph
							>  
							How ONE-T performance is measured?
            </Typography>

						
            <Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>  
							There are several different ways to measure a validator Performance. ONE-T focus is strictly based on para-validator performance, which means that only when a validator is assigned to para-validate in a new session is when it's performance is evaluated. Performance tracks three categories:
<br/>1. The amount of missed candidate backing votes for parachains. Less is better.
<br/>2. The total amount of para-validador points collected per session. More is better.
<br/>3. How many times a validator has been para-validator for the last X sessions. More is better. (This is a completely random factor, so it weight is the lowest of the 3, but still an important one. The more assignments a validator has, the more chances of missing candidate backing votes).
            </Typography>
            <Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
							At the end of each era the score is calculated based on the 3 points previously described (score formula). A higher score means top performance.
            </Typography>
          </Grid>
          <Grid item xs sm></Grid>
				</Grid>
			</Container>
		</main>
  );
}

export default Body;