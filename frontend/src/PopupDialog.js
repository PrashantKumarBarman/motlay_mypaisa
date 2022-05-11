import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function PopupDialog({ message }) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if(message) {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
        else {
            setOpen(false);
        }
    }, [message]);

    const handleClose = () => {
        setOpen(false);
    };

    if(message) {
        return (
            <div>
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {message.title ? message.title : '' }
                </DialogTitle>
                <DialogContent>
                {message.type === 'error' &&
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {message.text}
                        </Alert>
                    </DialogContentText>
                }
    
                {message.type !== 'error' &&
                    <DialogContentText id="alert-dialog-description">
                        {message.text}
                    </DialogContentText>
                }
                </DialogContent>
                </Dialog>
            </div>
        );
    }
    else {
        return null;
    }
}
