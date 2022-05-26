import React from 'react'
import moment from 'moment'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { NomineesBox } from './NomineesBox';
import { Spinner } from '../../components/Spinner'
import { JoinDialog } from './JoinDialog'
import { useGetPoolQuery, useGetPoolNomineesQuery } from '../api/apiSlice'

export const PoolBox = ({poolId, api, extra}) => {

  const { data: pool, isFetching: poolIsFetching, isSuccess: poolIsSuccess } = useGetPoolQuery(poolId)
  const { data: nominees, isSuccess: nomineesIsSuccess } = useGetPoolNomineesQuery(poolId)

  let content
  if (poolIsFetching) {
    content = <Spinner text="Loading..." />
  } else if (poolIsSuccess) {
    content = (
      <Card sx={{ height: '100%', minHeight: '400px',border: '2px solid rgba(0, 0, 0, 0.12)', borderRadius: '16px' }} elevation={0}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ padding: '16px 0', minHeight: '176px', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" component="h2">
                  {pool.metadata.substring(0, 15)}
                </Typography>
                <CardActions sx={{ alignItems: "center", justifyContent: "center"}}>
                  <JoinDialog poolId={poolId} api={api} />
                </CardActions>
              </Box>
              {nomineesIsSuccess ?
              <Typography variant="subtitle2">
              Nomination for {pool.metadata} is based on the best TVP validators performances of the last 48 sessions. {extra ? extra : ''}Only the <b>Top {nominees.nominees.length}</b> are nominated.
              </Typography> : null}
            </Box>
            <Box display="flex">
              <Typography variant="caption" align="right" sx={{width: '100%'}} gutterBottom>
                last data sync {moment.unix(pool.ts).utc().format("DD/MM/YYYY HH:mm:ss (+UTC)")}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ padding: '8px 0 16px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box sx={{ paddingRight: '32px' }}>
                <Typography variant="h5">
                  {pool.member_counter}
                </Typography>
                <Typography variant='subtitle2'>
                  Members
                </Typography>
              </Box>
              <Box sx={{ paddingRight: '32px' }}>
                <Typography variant="h5">
                  {pool.bonded}
                </Typography>
                <Typography variant='subtitle2'>
                  Bonded
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4">
                {nomineesIsSuccess ? `${Math.round(nominees.apr * 10000) / 100}%` : '-'}
                </Typography>
                <Typography variant='subtitle2'>
                  APR
                </Typography>
              </Box>
            </Box>
            <NomineesBox poolId={poolId} />
          </CardContent>
      </Card>
    )
  }

  return <section>{content}</section>
}
