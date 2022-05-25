import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { PoolBox } from './features/pools/PoolBox'
import Footer from './components/footer'
import withTheme from './theme/withTheme'
import onet from './assets/onet.svg';

function App() {
  return (
      <main style={{ background: "linear-gradient(180deg, #FFF, #F1F1F0)" }} >
          {/* Hero unit */}
          <Box
            sx={{
              // bgcolor: 'background.paper',
              
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: `32px 0 64px 0`}}>
                <img src={onet} style={{width: 200, height: 200 }} alt={"logo"}/>
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
              </Box>

              <Typography variant="subtitle1" align="center" color="text.primary">
              Join a pool and share in staking rewards from the <br />top-best <Link href="https://wiki.polkadot.network/docs/thousand-validators" 
                target="_blank" rel="noreferrer" color="inherit" 
                sx={{
                  textDecoration: "underline",
                  textDecorationThickness: 4,
                  '&:hover': {
                    textDecorationThickness: 4,
                    // textDecorationColor: 'primary.main',
                  }
                }}>TVP</Link> validators of <b>Kusama</b> - curated by ONE-T.
              </Typography>
            </Container>

          </Box>
          <Container sx={{ py: 4 }} maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <PoolBox poolId={10} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PoolBox poolId={15} extra=" and validators with a lower commission are scored higher" />
              </Grid>
            </Grid>
          </Container>
          
          <Footer />
      </main>
  );
}

export default withTheme(App);
