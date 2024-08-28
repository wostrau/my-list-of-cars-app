import { FC } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from '@mui/material';
import { styles } from './MessageModal.styles';
import { MessageModalProps } from './MessageModal.interfaces';

export const MessageModal: FC<MessageModalProps> = ({
  open,
  message,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: styles.dialog }}
    >
      <DialogTitle>Message</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
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
