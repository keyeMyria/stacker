import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import { MenuItem } from 'material-ui/Menu'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

import Downshift, { ControllerStateAndHelpers } from 'downshift'

import User from '../../../models/User'
import RoleSelectStore from '../../../stores/RoleSelectStore'

interface Props {
	store: RoleSelectStore
}

type ClassNames = 'root' | 'filter' | 'suggestions'

const decorate = withStyles<ClassNames>((theme) => ({
	root: {
		flexGrow: 1,
		position: 'relative',
		margin: '8px 16px'
	},
	filter: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		paddingBottom: 8,
		paddingLeft: 16,
		paddingRight: 16,
		marginBottom: 8
	},
	suggestions: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0
	  }
}))

const filterUsers = (inputValue: string) => (u: User) => (
	!inputValue || u.fullName.toLowerCase().includes(inputValue.toLowerCase())
)

const UserSelect: React.SFC<Props & WithStyles<ClassNames>> = (props) => {
	const { users } = props.store

	const mapSuggestion = (sugProps: ControllerStateAndHelpers) => (u: User, index: number) => (
		<MenuItem
			{...sugProps.getItemProps({ item: u })}
			key={u.fullName}
			selected={sugProps.highlightedIndex === index}
			component="div"
			style={{ fontWeight: sugProps.selectedItem === u.fullName ? 500 : 400 }}
			dense
		>
			{u.fullName}
		</MenuItem>
	)

	const renderAutocomplete = (sugProps: ControllerStateAndHelpers) => {
		const items = users.filter(filterUsers(sugProps.inputValue || ''))

		const suggestions = (
			<Paper className={props.classes.suggestions}>
				{items.map(mapSuggestion(sugProps))}
			</Paper>
		)

		return (
			<div className={props.classes.root}>
				<TextField
					fullWidth={true}
					placeholder="Přidat..."
					{...sugProps.getInputProps({ onChange: (e: any) => {
						console.log(e.target.value)
						if (e.target.value === '') {
							sugProps.clearSelection()
						}
					}})}
				/>
				{sugProps.isOpen ? suggestions : null}
			</div>
		)
	}

	// FIXME: Clear after selection
	const handleSelect = (selectedItem: User) => {
		props.store.addRole(selectedItem)
	}
	const itemToString = (item: User) => item ? item.fullName : ''

	return(
		<Downshift
			render={renderAutocomplete}
			onSelect={handleSelect}
			itemToString={itemToString}
		/>
	)
}

export default decorate(observer(UserSelect))
