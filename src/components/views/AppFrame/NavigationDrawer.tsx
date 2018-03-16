import * as React from 'react'
import { Link } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
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
	| 'divider'
)

const drawerWidth = 240

const decorate = withStyles<ClassKeys>(theme => ({
	drawerPaper: {
		position: 'relative',
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	linkItem: {
		textDecoration: 'none'
	},
	divider: {
		marginBottom: 8,
		marginTop: 8
	}
}), { withTheme: true })

class NavigationDrawer extends React.Component<Props & WithStyles<ClassKeys>> {
	render() {
		return (
			<Drawer
				variant="persistent"
				open={this.props.open}
				classes={{ paper: this.props.classes.drawerPaper }}
			>
				<div>
					<div className={this.props.classes.drawerHeader}>
						<IconButton onClick={this.props.handleClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<List>
						<Link to="/" className={this.props.classes.linkItem}>
							<ListItem button>
								<ListItemText primary="Zažádat paletu" />
							</ListItem>
						</Link>
						<Link to="/requests" className={this.props.classes.linkItem}>
							<ListItem button>
								<ListItemText primary="Aktivní požadavky" />
							</ListItem>
						</Link>
						<Link to="/map" className={this.props.classes.linkItem}>
							<ListItem button>
								<ListItemText primary="Mapa palet" />
							</ListItem>
						</Link>
						<Link to="/history" className={this.props.classes.linkItem}>
							<ListItem button>
								<ListItemText primary="Historie požadavků" />
							</ListItem>
						</Link>

						<Divider className={this.props.classes.divider} />

						<Link to="/administration" className={this.props.classes.linkItem}>
							<ListItem button>
								<ListItemText primary="Administrace" />
							</ListItem>
						</Link>
					</List>
				</div>
			</Drawer>
		)
	}
}

export default decorate(NavigationDrawer)
