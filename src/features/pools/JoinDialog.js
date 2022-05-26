import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import Identicon from '@polkadot/react-identicon';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from '@polkadot/extension-dapp';
import {
  changeTo,
  selectAccount,
} from '../../features/web3/web3Slice';
import {
  selectChain,
  selectChainInfo,
} from '../../features/chain/chainSlice';

const steps = ['Choose account', 'Join nomination pool', 'Authorize transaction', 'Extrinsic status'];
const stepsActions = ['Confirm', '+ Join', 'Sign and Submit'];

export const hashDisplay = (hash) => {
  return !!hash ? `${hash.slice(0, 6)}...${hash.slice(hash.length-4, hash.length)}` : `-`
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function useWeb3EnableHook() {
  const [isEnabled, setIsEnabled] = React.useState(false);
  
  React.useEffect(() => {
    const isWeb3Enabled = async () => {
      // returns an array of all the injected sources
      // (this needs to be called first, before other requests)
      const allInjected = await web3Enable('pools.turboflakes.io'); 
      if (allInjected.length > 0) {
        setIsEnabled(true);
      }
    }
    
    isWeb3Enabled()
  }, []);

  return [isEnabled];
}

function useWeb3AccountsHook(isEnabled) {
  const [accounts, setAccounts] = React.useState([]);
  
  React.useEffect(() => {
    const fetchWeb3Accounts = async () => {
      // returns an array of { address, meta: { name, source } }
      // meta.source contains the name of the extension that provides this account
      const allAccounts = await web3Accounts(); 
      if (allAccounts.length > 0) {
        setAccounts(allAccounts);
      }
    }
    
    if (isEnabled) {
      fetchWeb3Accounts()
    }
  }, [isEnabled]);

  return [accounts];
}

function useWeb3JoinPool(api, chain, chainInfo, account, amount, poolId, joinIntent) {
  const [result, setResult] = React.useState({status: "Waiting", message: "", errorMessage: ""});

  React.useEffect(() => {
    
    const fetchWeb3AccountFromSource = async (account) => {
      return await web3FromSource(account.meta.source)
    }

    if (api && chain && chainInfo && account && amount && poolId && joinIntent) {
      
        const ext = api.tx.nominationPools.join(amount * Math.pow(10, chainInfo.tokenDecimals[0]), poolId);
        const {method: { method, section }} = ext
        const extDescription = `${section}.${method}`

        fetchWeb3AccountFromSource(account).then((injector) => {
          ext.signAndSend(account.address, { signer: injector.signer }, ({ status, events = [] }) => {

            if (status.isInBlock || status.isFinalized) {

              console.log(`Transaction in block (https://${chain}.subscan.io/extrinsic/${ext.hash.toString()})`)
              
              events.forEach(({ event }) => {
                const url = {
                  href: `https://${chain}.subscan.io/extrinsic/${ext.hash.toString()}`,
                  extrinsic_hash: hashDisplay(status.hash.toString()),
                }
                if (api.events.system.ExtrinsicSuccess.is(event)) {
                  const result = {
                    status: "Success",
                    message: `${extDescription} Success`,
                    errorMessage: "",
                    url
                  }
                  setResult(result);
                } else if (api.events.system.ExtrinsicFailed.is(event)) {
                  // extract the data for this event
                  const [dispatchError] = event.data;
                  
                  // decode the error
                  if (dispatchError.isModule) {
                    // for module errors, we have the section indexed, lookup
                    // (For specific known errors, we can also do a check against the
                    // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
                    const decoded = api.registry.findMetaError(dispatchError.asModule);
                    const { docs, method, section } = decoded;
                    console.log(`${section}.${method}: ${docs.join(' ')}`);
                    const result = {
                      status: "Failed",
                      message: "",
                      errorMessage: `${section}.${method}: ${docs.join(' ')}`,
                    }
                    setResult(result);
                  } else {
                    // Other, CannotLookup, BadOrigin, no extra info
                    const result = {
                      status: "Failed",
                      message: "",
                      errorMessage: dispatchError.toString(),
                    }
                    setResult(result);
                  }
                }
              })
            } else {
                const result = {
                  status: "In Progress",
                  message: `Current status: ${status.type}`,
                  errorMessage: "",
                }
                setResult(result);
            }

          }).catch((error) => {
              const result = {
                status: "Failed",
                errorMessage: `Extrinsic failed: ${error}`
              }
              setResult(result);
          });
        })
    }

  }, [api, chain, chainInfo, account, amount, poolId, joinIntent]);


  React.useEffect(() => {
    if (result.status === "Failed") {
      setTimeout(() => {
          let result = {status: "Reset", message: "", errorMessage: ""}
          setResult(result);
      }, 6000)
    } else if (result.status === "Success") {
      setTimeout(() => {
          let result = {status: "Done", message: "", errorMessage: "", url: "" }
          setResult(result);
      }, 6000)
    } else if (["Reset", "Done"].includes(result.status)) {
      let result = {status: "Waiting", message: "", errorMessage: ""}
      setResult(result);
    }
  }, [result])

  return [result];
}

export function JoinDialog({poolId, api}) {
  
  const dispatch = useDispatch();
	const web3Account = useSelector(selectAccount);
  const selectedChain = useSelector(selectChain);
  const selectedChainInfo = useSelector(selectChainInfo);

  const [currentStep, setCurrentStep] = React.useState(0);
  const [amount, setAmount] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelect] = React.useState(web3Account);
  const [stepsCompleted, setStepsCompleted] = React.useState(false);

  const [isEnabled] = useWeb3EnableHook();
  const [accounts] = useWeb3AccountsHook(isEnabled);
  const [result] = useWeb3JoinPool(api, selectedChain, selectedChainInfo, web3Account, amount, poolId, stepsCompleted);

  const handleClickOpen = () => {
    if (!!web3Account) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setSelect(undefined);
    setOpen(false);
    setStepsCompleted(false);
  };

  const handleNext = () => {
    if (currentStep === 0 && !!selected) {
      dispatch(changeTo(selected));
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
      setStepsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(1);
    }
    setStepsCompleted(false); 
  };

  const handleListItemClick = (account) => {
    setSelect(account)
  };

  const handleChangeAmount = (e) => {
    if (parseInt(e.target.value) < 1) {
      return setAmount(1);
    } 
    setAmount(parseInt(e.target.value));
    
  }

  // If extrinsic failed return to previous step, if succeededs close dialog
  if (stepsCompleted && result.status === "Reset") {
    handleBack()
  } else if (stepsCompleted && result.status === "Success") {
    handleClose()
  }

  return (
    <div>
      <Button variant="contained" size="large" sx={{minWidth: '128px'}} onClick={handleClickOpen}>
        <AddIcon sx={{ mr: 1}} /> Join
      </Button>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEnabled ? steps[currentStep] : 'Access to Polkadot{.js}'}
        </BootstrapDialogTitle>
        {isEnabled ?
          <DialogContent dividers sx={{width: 544, height: 320}}>
            {currentStep === 0 ? 
              <List sx={{ width: '100%', height: "100%", overflow: 'auto', bgcolor: 'background.paper' }}>
                {accounts.map((account, index) => 
                  <ListItem alignItems="center" key={index} >
                      <ListItemButton disableRipple key={index}
                        onClick={() => handleListItemClick(account)}
                      >
                        <ListItemAvatar>
                          <Identicon
                            value={account.address}
                            size={32}
                            theme={'polkadot'} />
                        </ListItemAvatar>
                        <ListItemText sx={{ 
                            '& .MuiListItemText-secondary': {
                              color: "text.primary",
                              fontSize: "0.75rem",
                            }
                          }}
                          primary={account.meta.name}
                          secondary={account.address}
                        />
                        {!!selected && selected.address === account.address ? <CheckIcon /> : null}
                    </ListItemButton>
                  </ListItem>
                )}
              </List> : (currentStep === 1 ? 
                <Box sx={{ p: 4 }}>
                  <Typography variant="subtitle2" gutterBottom>The account that is to join the pool:</Typography>
                  <Box display="flex" alignItems="center" sx={{ mb: 3}}>
                    <Identicon
                      value={web3Account.address}
                      size={32}
                      theme={'polkadot'} />
                    <Typography variant='h5' sx={{ pl: 2 }}>{web3Account.meta.name}</Typography>
                  </Box>
                  <Typography variant="subtitle2" gutterBottom>The initial value to assign to the pool:</Typography>
                  <TextField
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    type="number"
                    defaultValue={amount}
                    onChange={handleChangeAmount}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" disableTypography>
                          {selectedChainInfo.tokenSymbol[0]}
                        </InputAdornment>
                      ),
                    }}
                    helperText={`1 ${selectedChainInfo.tokenSymbol[0]} = ${Math.pow(10, selectedChainInfo.tokenDecimals[0])} Planks`}
                  />
                </Box> : (currentStep === 2 ? 
                  <Box sx={{ p: 4 }}>
                    <Typography variant="caption">{`tx: nominationPools.join(${amount * Math.pow(10, selectedChainInfo.tokenDecimals[0])}, ${poolId})`}</Typography>
                    <Typography variant="h5" gutterBottom>nominationPools.join(amount, poolId)</Typography>
                    
                    <Typography variant="subtitle2">Stake funds with a pool. The amount to bond is transferred from the member to the pools account and immediately increases the pools bond. </Typography>
                  </Box> :

                  <Box sx={{ p: 4 }}>
                    <Typography variant="caption" gutterBottom>{`tx: nominationPools.join(${amount * Math.pow(10, selectedChainInfo.tokenDecimals[0])}, ${poolId})`}</Typography>
                    <Typography variant="h5" gutterBottom>{result.status}</Typography>

                    {!!result.message ? <Typography variant='body2' gutterBottom>{result.message}</Typography> : null}
                    {!!result.errorMessage ? <Typography variant='body2' color="primary.main" gutterBottom>Error: {result.errorMessage}</Typography> : null}
                    
                  </Box>)) }
          </DialogContent> : 
          <DialogContent>
            <Typography gutterBottom>
            {`In order to Join the Pool, this application needs access to the Polkadot{.js} extension in your browser.`}
            </Typography>
            <Typography gutterBottom>
            {`If Polkadot{.js} extension is already installed, just allow turboflakes.io to access it.`}
            </Typography>
            <Typography gutterBottom>
            Otherwise go to <Link href="https://polkadot.js.org/extension/" 
                sx={{
                  textDecoration: "underline",
                  textDecorationThickness: 2,
                  '&:hover': {
                    textDecorationThickness: 2,
                    // textDecorationColor: 'primary.main',
                  }
                }} underline="none" target="_blank" rel="noreferrer" color="inherit">polkadot.js.org/extension</Link> to install it.
            </Typography>
          </DialogContent>
          }
          
          {isEnabled && currentStep < 3 ?
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
              <Button autoFocus onClick={handleBack} size="large" color="secondary" disabled={currentStep === 0}>
                Back
              </Button>
              <Typography sx={{ position: 'absolute', left: 240}}>{`${currentStep + 1} / 3`}</Typography>
              <Button autoFocus onClick={handleNext} size="large" disabled={!["Waiting", "Failed"].includes(result.status)}>
                {stepsActions[currentStep]}
              </Button>
            </DialogActions> : null }
      </BootstrapDialog>
    </div>
  );
}

JoinDialog.propTypes = {
  poolId: PropTypes.number,
};