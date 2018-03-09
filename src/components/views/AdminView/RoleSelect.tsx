import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import Tabs, { Tab } from 'material-ui/Tabs'

import RoleSelectStore from '../../../stores/RoleSelectStore'

import UserList from './UserList'
import UserSelect from './UserSelect'

interface Props {
	store: RoleSelectStore
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'grid',
		width: 400
	}
}))

@observer
class RoleSelect extends React.Component<Props & WithStyles<ClassNames>> {
	handleTabChange = (event: any, value: string) => {
		this.props.store.changeRole(value)
	}

	render() {
		const { store } = this.props

		return(
			<Card className={this.props.classes.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={store.role}
						onChange={this.handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						fullWidth
					>
						<Tab value="admin" label="Administrátoři" />
						<Tab value="worker" label="Pracovníci zakladače" />
					</Tabs>
				</AppBar>
				<UserList store={store} />
				<Divider />
				<UserSelect store={store} />
			</Card>
		)
	}
}

export default decorate(RoleSelect)
