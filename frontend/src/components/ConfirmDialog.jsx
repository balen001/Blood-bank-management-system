import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" align="center">{"Confirm Deletion"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to cancel this appointment? This action cannot be undone.
        </DialogContentText>
      </DialogContent>


      <DialogActions>
        <Box display="flex" justifyContent="center" width="100%">
          <Button onClick={onClose} sx={{
            backgroundColor: 'blue', color: 'white', '&:hover': {
              backgroundColor: 'darkblue',
            }
          }}>
            Cancel
          </Button>

          <Box width="20px"></Box>
          <Button onClick={onConfirm} sx={{
            backgroundColor: 'red', color: 'white', '&:hover': {
              backgroundColor: 'darkred',
            }
          }} autoFocus>
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;