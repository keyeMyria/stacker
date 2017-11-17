import * as React from 'react'
import * as classNames from 'classnames'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'

import MenuIcon from 'material-ui-icons/Menu'

import { withStyles, WithStyles } from 'material-ui/styles'

import NavigationDrawer from './NavigationDrawer'

interface State {
    open: boolean
}

type ClassKeys = (
    'root'
    | 'menuButton'
    | 'appBar'
    | 'appBarShift'
    | 'content'
    | 'contentShift'
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
		height: 'calc(100% - 56px)',
		marginTop: 56,
		[theme.breakpoints.up('sm')]: {
			content: {
				height: 'calc(100% - 64px)',
				marginTop: 64,
			},
        },
        marginLeft: -drawerWidth
    },
    contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0
	}
}), { withTheme: true })

class AppFrame extends React.Component<WithStyles<ClassKeys>, State> {
    state: State = {
        open: false
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    }

    handleDrawerClose = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar
                    position="static"
                    className={classNames(
                        this.props.classes.appBar,
                        { [this.props.classes.appBarShift]: this.state.open }
                    )}
                >
                    <Toolbar>
                        <IconButton
                            className={this.props.classes.menuButton}
                            color="contrast"
                            aria-label="Menu"
                            onClick={() => this.handleDrawerOpen()}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography type="title" color="inherit">
                            Stacker
                        </Typography>
                    </Toolbar>
                </AppBar>

                <NavigationDrawer
                    open={this.state.open}
                    handleClose={this.handleDrawerClose}
                />

                <main className={classNames(
                    this.props.classes.content,
                    { [this.props.classes.contentShift]: this.state.open }
                )}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
  
export default decorate<{}>(AppFrame)