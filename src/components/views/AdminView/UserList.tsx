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
		margin: '8px 16px'
	}
}))

const UserList: React.SFC<Props & WithStyles<ClassNames>> = (props) => {
	const mapUsers = () => (
		props.store.users.map(u => <UserListItem key={u.username} user={u} />)
	)

	return(
		<List>
			{mapUsers()}
		</List>
	)
}

export default decorate(observer(UserList))
