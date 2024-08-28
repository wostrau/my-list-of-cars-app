import { FC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';

interface MessageModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const MessageModal: FC<MessageModalProps> = ({
  open,
  message,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 600,
          height: 400,
          maxWidth: 'none',
          maxHeight: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <DialogTitle>Message</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: 2,
        }}
      >
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Button
          onClick={onClose}
          color='primary'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
