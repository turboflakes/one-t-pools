import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { getNetworkWSS } from '../../constants'
import Header from '../header'
import { PoolBox } from '../../features/pools/PoolBox'
import onet from '../../assets/onet.svg';
import { getNetworkName, getNetworkPoolId } from '../../constants'
import {
  selectChain,
} from '../../features/chain/chainSlice';

function useWeb3Api(chain) {
  const [api, setApi] = React.useState(undefined);
  
  React.useEffect(() => {
    
    const wsProvider = new WsProvider(getNetworkWSS(chain));

    const createWeb3Api = async (provider) => {
      return await ApiPromise.create({ provider });
    }

    if (chain) {
      createWeb3Api(wsProvider).then((api) => setApi(api));
    }
  }, [chain]);

  return [api];
}


export const IndexPage = ({ match }) => {
  const selectedChain = useSelector(selectChain);
  const [api] = useWeb3Api(selectedChain);

  return (
    <React.Fragment>
      <Header api={api} />
      <main style={{ background: "linear-gradient(180deg, #FFF, #F1F1F0)" }} >
          <Box
            sx={{
              // bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: `8px 0 64px 0`}}>
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
                }}>TVP</Link> validators of <b>{getNetworkName(selectedChain)}</b> - curated by ONE-T.
              </Typography>
            </Container>

          </Box>
          <Container sx={{ py: 4 }} maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <PoolBox poolId={getNetworkPoolId(selectedChain, 0)} api={api} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PoolBox poolId={getNetworkPoolId(selectedChain, 1)} api={api} extra="Validators with a lower commission are scored higher. " />
              </Grid>
            </Grid>
          </Container>
          
          
      </main>
    </React.Fragment>
  );
}
