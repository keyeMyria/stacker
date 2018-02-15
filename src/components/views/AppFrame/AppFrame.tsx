import * as React from 'react'
import * as classNames from 'classnames'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Menu, { MenuItem } from 'material-ui/Menu'

import MenuIcon from 'material-ui-icons/Menu'

import { withStyles, WithStyles } from 'material-ui/styles'

import AppStore from '../../../stores/AppStore'

import NavigationDrawer from './NavigationDrawer'

interface Props {
    store: AppStore
}

interface State {
    drawerOpen: boolean,
    menuAnchor: any
}

type ClassKeys = (
    'root'
    | 'menuButton'
    | 'appBar'
    | 'appBarShift'
    | 'content'
    | 'contentShift'
    | 'title'
)

const drawerWidth = 240

const decorate = withStyles<ClassKeys>(theme => ({
    root: {
        position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%'
    },
	menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
		position: 'absolute',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth
	},
	content: {
		width: '100%',
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginTop: 56,
		[theme.breakpoints.up('sm')]: {
			height: 'calc(100% - 64px)',
            marginTop: 64
        },
        marginLeft: -drawerWidth
    },
    contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0
    },
    title: {
        flex: 1
    }
}), { withTheme: true })

class AppFrame extends React.Component<Props & WithStyles<ClassKeys>> {
    state: State = {
        drawerOpen: false,
        menuAnchor: null
    }

    handleDrawerOpen = (): void => {
        this.setState({ drawerOpen: true })
    }

    handleDrawerClose = (): void => {
        this.setState({ drawerOpen: false })
    }

    handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.setState({ menuAnchor: event.currentTarget })
    }

    handleMenuClose = (): void => {
        this.setState({ menuAnchor: null })
    }

    handleLogout = (): void => {
        this.props.store.logout()
        this.handleMenuClose()
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar
                    position="static"
                    className={classNames(
                        this.props.classes.appBar,
                        { [this.props.classes.appBarShift]: this.state.drawerOpen }
                    )}
                >
                    <Toolbar>
                        <IconButton
                            className={this.props.classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={() => this.handleDrawerOpen()}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            type="title"
                            color="inherit"
                            className={this.props.classes.title}
                        >
                            Stacker
                        </Typography>

                        {this.props.store.isAuthenticated && (
                            <div>
                                <Button
                                    onClick={this.handleMenuOpen}
                                    color="inherit"
                                >
                                    {this.props.store.user.fullName}
                                </Button>
                                <Menu
                                    open={Boolean(this.state.menuAnchor)}
                                    anchorEl={this.state.menuAnchor}
                                    onClose={this.handleMenuClose}
                                >
                                    <MenuItem onClick={this.handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>

                <NavigationDrawer
                    open={this.state.drawerOpen}
                    handleClose={this.handleDrawerClose}
                />

                <main className={classNames(
                    this.props.classes.content,
                    { [this.props.classes.contentShift]: this.state.drawerOpen }
                )}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
  
export default decorate(AppFrame)