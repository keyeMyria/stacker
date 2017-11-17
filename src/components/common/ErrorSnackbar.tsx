import * as React from 'react'

import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

interface State {
    open: boolean,
    message: string
}

interface ErrorMessageProps {
    message: string
}

interface CloseButtonProps {
    closeAction: (event: React.MouseEvent<any>) => void
}

const ErrorMessage: React.SFC<ErrorMessageProps> = (props) => {
    return <span>{props.message}</span>
}

const CloseButton: React.SFC<CloseButtonProps> = (props) => {
    return (
        <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={props.closeAction}
        >
            <CloseIcon />
        </IconButton>
    )
}

class ErrorSnackbar extends React.Component<{}, State> {
    state: State = {
        open: false,
        message: ''
    }

    handleDisplayError = (message: string) => {
        this.setState({ open: true, message })
    }

    handleRequestClose = (event: React.MouseEvent<any>): void => {
        this.setState({ open: false, message: '' })
    }

    render(): JSX.Element {
        return(
            <Snackbar
                open={this.state.open}
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose}
                message={<ErrorMessage message={this.state.message} />}
                action={<CloseButton closeAction={this.handleRequestClose} />}
            />
        )
    }
}

export default ErrorSnackbar