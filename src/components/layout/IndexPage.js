import React from 'react';
import { useSelector } from 'react-redux';
import { ApiPromise, WsProvider } from '@polkadot/api';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Header } from '../Header'
import { Body } from '../Body'
import { Footer } from '../Footer'
import { Loading } from '../Loading'
import { ScrollTop } from '../ScrollTop'
import { getNetworkWSS } from '../../constants'
import {
  selectChain,
} from '../../features/chain/chainSlice';

function useWeb3Api(chain) {
  const [api, setApi] = React.useState(undefined);

  React.useEffect(() => {
    
    const createWeb3Api = async (provider) => {
      return await ApiPromise.create({ provider });
    }

    if (chain) {
      const wsProvider = new WsProvider(getNetworkWSS(chain));
      createWeb3Api(wsProvider).then((api) => setApi(api));
    }
  }, [chain]);

  return [api];
}

export const IndexPage = (props) => {
  const selectedChain = useSelector(selectChain);
  const [api] = useWeb3Api(selectedChain);

  if (!api) {
    return (<Loading />)
  } else {
    return (
      <React.Fragment>
        <Header api={api} />
        <Body api={api} />
        <Footer />
        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    )
  }
}
