import * as React from 'react'
import { Link } from 'react-router-dom'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemText } from 'material-ui/List'

import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'

import { withStyles, WithStyles } from 'material-ui/styles'

interface Props {
    open: boolean,
    handleClose: () => void
}

type ClassKeys = (
    'drawerPaper'
    | 'drawerHeader'
    | 'linkItem'
)

const drawerWidth = 240

const decorate = withStyles<ClassKeys>(theme => ({
	drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    linkItem: {
        textDecoration: 'none'
    }
}), { withTheme: true })

class NavigationDrawer extends React.Component<Props & WithStyles<ClassKeys>> {
    render() {
        return (
            <Drawer
                type="persistent"
                open={this.props.open}
                classes={{
                    paper: this.props.classes.drawerPaper,
                }}
            >
                <div>
                    <div className={this.props.classes.drawerHeader}>
                        <IconButton onClick={this.props.handleClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to="/request" className={this.props.classes.linkItem}>
                            <ListItem button>
                                <ListItemText primary="Request" />
                            </ListItem>
                        </Link>
                        <Link to="/requests" className={this.props.classes.linkItem}>
                            <ListItem button>
                                <ListItemText primary="Active Requests" />
                            </ListItem>
                        </Link>
                        <Link to="/map" className={this.props.classes.linkItem}>
                            <ListItem button>
                                <ListItemText primary="Pallet map" />
                            </ListItem>
                        </Link>
                        <Link to="/history" className={this.props.classes.linkItem}>
                            <ListItem button>
                                <ListItemText primary="Request history" />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
        )
    }
}
  
export default decorate(NavigationDrawer)