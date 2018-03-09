import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import { FormControl } from 'material-ui/Form'
import Input from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'

import User from '../../../models/User'
import RoleSelectStore from '../../../stores/RoleSelectStore'

interface Props {
	store: RoleSelectStore
}

type ClassNames = 'root' | 'filter'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		margin: '8px 16px'
	},
	filter: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		paddingBottom: 8,
		paddingLeft: 16,
		paddingRight: 16,
		marginBottom: 8
	}
}))

const UserSelect: React.SFC<Props & WithStyles<ClassNames>> = (props) => {
	const handleChange = (event: any) => {
		props.store.changeSelected(event.target.value)
	}

	const handleFilter = (event: any) => {
		props.store.changeFilter(event.target.value)
	}

	const mapMenuItems = (user: User) => (
		<MenuItem
			key={user.username}
			value={user.username}
		>
			{user.fullName}
		</MenuItem>
	)

	const renderSelected = (selected: any) => {
		selected = selected.filter((v: any) => v === undefined ? null : v)
		return selected.map((s: string) => {
			const user = props.store.users.find(u => u.username === s)
			if (user) { return user.fullName }
		}).join(', ')
	}

	return(
		<FormControl className={props.classes.root}>
			<Select
				multiple
				value={props.store.selectedUsers.slice()}
				onChange={handleChange}
				renderValue={renderSelected}
				disableUnderline
				MenuProps={{ MenuListProps: { dense: true }}}
			>
				<div>
					<Input
						value={props.store.filterUsers}
						onChange={handleFilter}
						className={props.classes.filter}
						placeholder="Hledat"
						disableUnderline
						fullWidth
					/>
				</div>
				{props.store.users.filter(props.store.filter).map(mapMenuItems)}
			</Select>
		</FormControl>
	)
}

export default decorate(observer(UserSelect))
