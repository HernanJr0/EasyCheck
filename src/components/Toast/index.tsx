import { Alert, Snackbar } from "@mui/material"

export default function Toast({ severity, children, toast, setToast }: any) {

    const handleSnackbarClose = () => {
        setToast(false);
    };

    return (
        <Snackbar
            open={toast}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
        >
            <Alert
                onClose={handleSnackbarClose}
                severity={severity}
                sx={{ width: "100%" }}
            >
                {children}
            </Alert>
        </Snackbar>
    )
}
