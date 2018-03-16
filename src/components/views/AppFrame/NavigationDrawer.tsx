import * as React from 'react'
import { Link } from 'react-router-dom'

import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemText } from 'material-ui/List'

import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'

import { withStyles, WithStyles } from 'material-ui/styles'

import AppStore from '../../../stores/AppStore'

interface Props {
	open: boolean,
	handleClose: () => void,
	store: AppStore
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
	isWorker = () => {
		const { isWorker, isAdmin } =  this.props.store.user
		return isWorker || isAdmin
	}
	isAdmin = () => this.props.store.user.isAdmin

	renderLink(path: string, text: string, showOn?: any) {
		if (showOn && !showOn()) { return null }

		return (
			<Link to={path} className={this.props.classes.linkItem}>
				<ListItem button>
					<ListItemText primary={text} />
				</ListItem>
			</Link>
		)
	}

	render() {
		const { isAdmin } = this.props.store.user

		if (this.props.store.user === undefined) { return null }

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
						{this.renderLink('/', 'Zažádat paletu')}
						{this.renderLink('/requests', 'Aktivní požadavky', this.isWorker)}
						{this.renderLink('/map', 'Mapa palet')}
						{this.renderLink('/history', 'Historie požadavků')}

						{isAdmin && <Divider className={this.props.classes.divider} />}

						{this.renderLink('/administration', 'Administrace', this.isAdmin)}
					</List>
				</div>
			</Drawer>
		)
	}
}

export default decorate(NavigationDrawer)
