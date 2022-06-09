import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Spinner } from '../../components/Spinner'
import { getNetworkName, getNetworkPoolId } from '../../constants'
import { useGetPoolsQuery } from '../api/apiSlice'
import {
  selectChain, selectChainInfo
} from '../chain/chainSlice';
import { Typography } from '@mui/material';


export const PoolsBox = () => {

  const { data, isFetching, isSuccess } = useGetPoolsQuery();
  const selectedChain = useSelector(selectChain);
  const selectedChainInfo = useSelector(selectChainInfo);
  const tokenSymbol = !!selectedChainInfo ? selectedChainInfo.tokenSymbol[0] : '';
  
  if (isFetching) {
    return (
      <section>
        <Spinner text="Loading..." />
      </section>
    )
  } else if (isSuccess) {

    const columns = [
      { 
        field: 'id', 
        headerName: 'Pool ID', 
        width: 104, 
        disableColumnMenu: true 
      },
      {
        field: 'metadata',
        headerName: '',
        sortable: false,
        width: 384,
        disableColumnMenu: true
      },
      {
        field: 'bonded',
        headerName: `Bonded in ${tokenSymbol}`,
        type: 'number',
        width: 192,
        disableColumnMenu: true 
      },
      {
        field: 'member_counter',
        headerName: 'Members',
        type: 'number',
        width: 128,
        disableColumnMenu: true 
      },
      {
        field: 'nominees_counter',
        headerName: 'Nominees',
        type: 'number',
        width: 128,
        disableColumnMenu: true 
      },
      {
        field: 'apr',
        headerName: 'APR (%)',
        description: 'APR is the Annual Percentage Rate. The Nomination Pool APR is based on the average APR of all the current pool nominees for the last 4 eras in Polkadot and the last 8 eras in Kusama.',
        type: 'number',
        width: 128,
        disableColumnMenu: true 
      },
    ];

    const onetColumns = [
      ...columns
    ]
    
    const onetRows = () => {
      if (!!data.pools) {
        return data.pools.filter(pool => (pool.id === parseInt(getNetworkPoolId(selectedChain, 0)) || 
          pool.id === parseInt(getNetworkPoolId(selectedChain, 1)))).map(pool => {
          return {
            id: pool.id,
            metadata: pool.metadata,
            bonded: parseInt(pool.bonded.replace(tokenSymbol, '').trim()),
            member_counter: pool.member_counter,
            nominees_counter: !!pool.nominees ? pool.nominees.nominees.length : 0,
            apr: !!pool.nominees ? Math.round(pool.nominees.apr * 10000)/100 : 0,
          }
        })
      }
      return []
    }

    const rows = () => {
      if (!!data.pools) {
        return data.pools.map((pool) => {
          return {
            id: pool.id,
            metadata: pool.metadata,
            bonded: parseInt(pool.bonded.replace(tokenSymbol, '').trim()),
            member_counter: pool.member_counter,
            nominees_counter: !!pool.nominees ? pool.nominees.nominees.length : 0,
            apr: !!pool.nominees ? Math.round(pool.nominees.apr * 10000)/100 : 0,
          }
        })
      }
      return []
    }

    const initialState = {
        sorting: {
          sortModel: [{ field: 'apr', sort: 'desc' }],
        }, 
    };

    const onetAPR = !!data.pools ? data.pools.filter(pool => 
      ( pool.id === parseInt(getNetworkPoolId(selectedChain, 0)) || 
        pool.id === parseInt(getNetworkPoolId(selectedChain, 1))))
        .map(pool => !!pool.nominees ? Math.round(pool.nominees.apr * 10000)/100 : 0)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0) / 2 : 0
    
    
    const allAPR = !!data.pools ? data.pools.map(pool => !!pool.nominees ? Math.round(pool.nominees.apr * 10000)/100 : 0)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0) / (data.pools.length) : 0
    
    return (
      <Box sx={{ mt: 8 }}>
        <Typography
								variant="h3"
								color="textSecondary"
								align="left"
								paragraph
					>{`ONE-T with ${Math.round(onetAPR)}% APR vs Other Pools`}</Typography>
        <Typography color="textSecondary" sx={{maxWidth: '100%'}} paragraph>At the present era - <i>{`${getNetworkName(selectedChain)} // ${data.era}`}</i> - the average APR for all nomination pools is {Math.round(allAPR)}%. In comparison, ONE-T nomination pools offer <b>{Math.round(onetAPR)}% APR</b>.</Typography>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ height: '628px', width: '100%',  
            '.MuiDataGrid-virtualScroller': {
              marginTop: '157px !important'
            }
            }}>
            <DataGrid
              classes={{
                columnHeaders: 'teste'
              }}
              sx={{ bgcolor: '#FFF', width: '100%', borderRadius: 2 }}
              rows={rows()}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]}
              initialState={initialState}
              disableSelectionOnClick
            />
            </Box>
            <Box sx={{ height: '104px', width: '100%', position: 'absolute', top: '54px',
              '& .super-app-theme--row': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                fontWeight: 'bold'
              }
              }}>
              <DataGrid
                sx={{ bgcolor: '#FFF', width: '100%', borderRadius: 0 }}
                getRowClassName={() => 'super-app-theme--row'}
                rows={onetRows()}
                columns={onetColumns}
                initialState={initialState}
                disableSelectionOnClick
                hideFooter
                headerHeight={0}
              />
          </Box>
        </Box>
        <Typography color="textSecondary" variant="caption" paragraph>last data sync and APR calculation {moment.unix(data.ts).utc().format("DD/MM/YYYY HH:mm:ss (UTC)")}</Typography>
      </Box>
    )
  }
  return null
}
