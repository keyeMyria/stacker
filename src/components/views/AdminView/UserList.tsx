import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import List from 'material-ui/List'

import RoleSelectStore from '../../../stores/RoleSelectStore'

import UserListItem from './UserListItem'

interface Props {
	store: RoleSelectStore
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		height: 400,
		overflow: 'auto'
	}
}))

const UserList: React.SFC<Props & WithStyles<ClassNames>> = (props) => {
	const { users } = props.store

	const mapUsers = () => (
		users
		.filter(u => {
			if (
				(props.store.role === 'admin' && !u.isAdmin) ||
				(props.store.role === 'worker' && !u.isWorker)
			) {
				return null
			}

			return u
		})
		.map(u => <UserListItem key={u.username} user={u} store={props.store} />)
	)

	return(
		<List className={props.classes.root}>
			{mapUsers()}
		</List>
	)
}

export default decorate(observer(UserList))
