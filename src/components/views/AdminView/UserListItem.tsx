import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import IconButton from 'material-ui/IconButton'
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'

import RemoveIcon from 'material-ui-icons/Clear'

import User from '../../../models/User'

interface Props {
	user: User
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
	return(
		<ListItem className={props.classes.root}>
			<ListItemText primary={props.user.fullName} />
			<ListItemSecondaryAction>
				<IconButton aria-label="Remove" className={props.classes.actionIcon}>
					<RemoveIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	)
}

export default decorate(UserListItem)
