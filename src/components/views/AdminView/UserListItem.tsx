import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import IconButton from 'material-ui/IconButton'
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'

import RemoveIcon from 'material-ui-icons/Clear'

import User from '../../../models/User'
import RoleSelectStore from '../../../stores/RoleSelectStore'

interface Props {
	user: User,
	store: RoleSelectStore
}

type ClassNames = 'root' | 'actionIcon'

// FIXME: Change secondary action styling
const decorate = withStyles<ClassNames>(() => ({
	root: {
		paddingTop: 6,
		paddingBottom: 6
	},
	actionIcon: {
	}
}))

const UserListItem: React.SFC<Props & WithStyles<ClassNames>> = (props) => {
	const handleChange = () => { props.store.removeRole(props.user) }

	return(
		<ListItem className={props.classes.root}>
			<ListItemText primary={props.user.fullName} />
			<ListItemSecondaryAction>
				<IconButton
					aria-label="Remove"
					className={props.classes.actionIcon}
					onClick={handleChange}
				>
					<RemoveIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	)
}

export default decorate(UserListItem)
