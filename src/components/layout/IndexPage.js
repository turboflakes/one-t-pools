import React from 'react';
import { useSelector } from 'react-redux';
import { ApiPromise, WsProvider } from '@polkadot/api';
import Header from '../Header'
import Body from '../Body'
import { Spinner } from '../Spinner'
import { getNetworkWSS } from '../../constants'
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

export const IndexPage = () => {
  const selectedChain = useSelector(selectChain);
  const [api] = useWeb3Api(selectedChain);

  if (!api) {
    return (<Spinner text="Loading..." />)
  } else {
    return (
      <React.Fragment>
        <Header api={api} />
        <Body api={api} />
      </React.Fragment>
    )
  }
}
