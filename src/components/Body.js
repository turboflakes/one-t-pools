import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// import IconButton from '@mui/material/IconButton';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { PoolBox } from '../features/pools/PoolBox'
import { PoolsBox } from '../features/pools/PoolsBox'
import onet from '../assets/onet.svg';
import { getNetworkName, getNetworkPoolId } from '../constants'
import {
  selectChain,
} from '../features/chain/chainSlice';


function Body({api}) {
	const theme = useTheme();
  	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const selected = useSelector(selectChain);

	// const handleExt = () => {
	// 	window.open('https://wiki.polkadot.network/docs/thousand-validators', '_blank')
	// }

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
					<Box sx={isMobile ? {minHeight: '60vh', display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: `8px 0 64px 0`} : 
						{minHeight: '60vh', display:'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: `8px 0 64px 0`}}>
						{/* <Box > */}
							<img src={onet} style={isMobile ? {width: 128, height: 128, margin: `8px 0 32px 0` } : {width: 288, height: 288 }} alt={"logo"}/>
						{/* </Box> */}
						<Box>
							<Typography
								component="h1"
								variant="h2"
								align="left"
								color="text.primary"
								gutterBottom
							>
								<Typography component="div" variant="h5" >Welcome to</Typography>
								ONE-T Nomination Pools
							</Typography>
							<Typography variant="subtitle1" align="left" color="text.primary">
							Join a pool and share in staking rewards from the best <Link href="https://wiki.polkadot.network/docs/thousand-validators" 
								target="_blank" rel="noreferrer" color="inherit" 
								sx={{
									textDecoration: "underline",
									textDecorationThickness: 4,
									'&:hover': {
										textDecorationThickness: 4,
										// textDecorationColor: 'primary.main',
									}
								}}>TVP</Link> validators performances of <b>{getNetworkName(selected)}</b> - curated by ONE-T.
							</Typography>
						</Box>
					</Box>
				</Container>

			</Box>
			<div style={{ backgroundColor: '#0B1317'}}>
      {/* <div style={{ backgroundColor: '#FFF'}}> */}
				<Container sx={{ py: 20 }} maxWidth="lg">
					<Typography
								variant="h3"
								color="textSecondary"
								align="left"
								paragraph
					>ONE-T Nomination Pools</Typography>
					<Grid container spacing={4} sx={{ mb: 4 }}>
						<Grid item xs={12} sm={6}>
							<PoolBox poolId={getNetworkPoolId(selected, 0)} api={api} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<PoolBox poolId={getNetworkPoolId(selected, 1)} api={api} extra="Validators with a lower commission (LC) are scored higher. " />
						</Grid>
					</Grid>
					<PoolsBox api={api} />
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
            >What is ONE-T?</Typography>
            <Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
            >
            ONE-T is a validator-performance report <b>bot</b> for the <i>Polkadot</i> and <i>Kusama</i> networks with special focus on the <b>One T</b>housand validator programme (<Link href="https://wiki.polkadot.network/docs/thousand-validators" 
								target="_blank" rel="noreferrer" color="inherit" 
								sx={{
									textDecoration: "underline",
									textDecorationThickness: 4,
									'&:hover': {
										textDecorationThickness: 4,
									}
								}}>TVP</Link>).
            </Typography>
						<Typography
							variant="h5"
							color="textPrimary"
							align="left"
							paragraph
							>  
							ONE-T performance score
            </Typography>
            <Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>  
							There are several different ways to assess a validator <i>performance</i>. ONE-T measure performance strictly when a validator is selected to participate in the <Link href="https://medium.com/polkadot-network/polkadot-v1-0-sharding-and-economic-security-e03099b4fa81" 
								target="_blank" rel="noreferrer" color="inherit" 
								sx={{
									textDecoration: "underline",
									textDecorationThickness: 4,
									'&:hover': {
										textDecorationThickness: 4,
									}
								}}>parachain consensus</Link>. Every new session a random set of active validators are selected to para-validate and is during this critical time that most of the points collected by a validator come from.
						</Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>  
							Parachain consensus uses a few different protocols that are strictly connected with the relay-chain consensus. A big slice of the para-validator (p/v) points come from the <i>Backing</i> process which is currently the main focus of ONE-T. All of the para-validators are tracked on the amount of missed candidate backing votes for parachains and the ones that miss less are performing better.
						</Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
							If the validator also performs well during the participation in the other protocols the overall p/v points increase. And for these points to be included in the performance score, ONE-T takes the average of p/v points over an amount of <i>X</i> sessions into the score calculation.
						</Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
							To finalize, there is inevitably a random factor - how many times a validator participates in the parachain consensus - being this a completely random factor, the weight of this category in the performance calculation is the lowest. But is still very important, because of the fact that the more assignments a validator has, the more chances one have to miss candidate backing votes. Having more p/v sessions is better and slightly increase the performance score.
            </Typography>
            <Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
							At the end of each era the performance <Link href="https://github.com/turboflakes/one-t/blob/main/SCORES.md#performance-score" 
								target="_blank" rel="noreferrer" color="inherit" 
								sx={{
									textDecoration: "underline",
									textDecorationThickness: 4,
									'&:hover': {
										textDecorationThickness: 4,
										// textDecorationColor: 'primary.main',
									}
								}}>score</Link> is calculated based on the three categories previously described. The backing votes ratio make up 75% of the score, average p/v points make up 18% and number of sessions as p/v the remaining 7%. Higher score means Top-Performance.
            </Typography>
						<Typography
							variant="h3"
							color="textPrimary"
							align="left"
							paragraph
							>  
							What are Nomination Pools?
            </Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
							Nomination pools are one of the most exciting features of the Staking system on Polkadot. Any token holder (no matter the size of their stake) can become a member and join a pool. Together, all the pool bonded funds, end-up acting as a single nominator account. To know more about nomination pools, please read <Link href="https://wiki.polkadot.network/docs/learn-nomination-pools" 
								target="_blank" rel="noreferrer" color="inherit" 
								sx={{
									textDecoration: "underline",
									textDecorationThickness: 4,
									'&:hover': {
										textDecorationThickness: 4,
										// textDecorationColor: 'primary.main',
									}
								}}>here</Link>.
            </Typography>
						<Typography
							variant="h3"
							color="textPrimary"
							align="left"
							paragraph
							>  
							Nomination Pools + ONE-T
            </Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
						With ONE-T performance score is easy to build a ranking and pick up the best validator performances from the last <i>X</i> sessions. Although this is not a guarantee that the best validators will remain on top of the ranking in subsequent sessions, most likely they are trusted and will continue to out perform. These are a very handy group of validators to select when choosing the validator candidates that help you earn higher staking rewards. And this is what ONE-T Nomination Pools is all about.
						</Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
							<b>ONE-T nominates the top 16 best TVP validators performers</b> (16 on Polkadot and 24 on Kusama) into a specific nomination pool once a day.
						</Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
						One more thing - performance is not only what nominators look for in their selection criteria. Validator commission takes a huge weight when is time to choose validators to nominate. And with this in mind, ONE-T also has a ranking of the top 8 best validators performances running on lower commission. This ranking is than used to pick the top validators (8 on Polkadot and 12 on Kusama) and nominate them into a specific nomination pool.
            </Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
						<b>Be a member and join ONE-T nomination pools. </b>
            </Typography>
						<Typography
							variant="h3"
							color="textPrimary"
							align="left"
							paragraph
							>  
							ONE-T reports
            </Typography>
						<Typography
							variant="body1"
							color="textPrimary"
							align="left"
							paragraph
							>
						ONE-T also provides on demand reports about the state of the Polkadot or Kusama network. Join the matrix public rooms below to know more!
            </Typography>
						<Grid container>            
							<Grid item xs sm={3}>
							</Grid>
							<Grid item xs={12} sm={3} align="center">
								<Link sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2}}
										color="textPrimary" target="_blank" rel="noreferrer"
										href="https://matrix.to/#/%23kusama-one-t-bot:matrix.org">
									<img style={{width: 80}} 
												src="https://github.com/turboflakes/one-t/blob/main/assets/one-t-kusama-avatar-128.png?raw=true" alt="" />
									<Typography
										component="span"
										variant="h5"
										color="textPrimary"
										>Kusama
									</Typography>
								</Link>
							</Grid>
							<Grid item xs={12} sm={3} align="center">
								<Link sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2}}
									color="textPrimary" target="_blank" rel="noreferrer"
									href="https://matrix.to/#/%23polkadot-one-t-bot:matrix.org">
									<img style={{width: 80}} 
												src="https://github.com/turboflakes/one-t/blob/main/assets/one-t-polkadot-avatar-128.png?raw=true" alt="" />
									<Typography
										component="span"
										variant="h5"
										color="textPrimary"
										>Polkadot
									</Typography>
								</Link>
							</Grid>
							</Grid>
          </Grid>
          <Grid item xs sm></Grid>
				</Grid>
			</Container>
		</main>
  );
}

export default Body;