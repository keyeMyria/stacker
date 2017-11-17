import * as React from 'react'
import { observer } from 'mobx-react'

import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import BlockIcon from 'material-ui-icons/Block'
import { withStyles, WithStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'

import RequestItemTitle from './RequestItemTitle'

import PalletRequest from '../../../stores/interfaces/PalletRequest'

interface Props {
	request: PalletRequest
}

type ClassKeys = 'root' | 'status'

const decorate = withStyles<ClassKeys>(() => ({
	root: {
		paddingTop: 6,
		paddingBottom: 6
	},
	status: {
		height: 12,
		marginLeft: 8,
		padding: 4,
		fontSize: 12,
		lineHeight: 1,
		color: grey[50],
		backgroundColor: grey[500],
		borderRadius: 2
	}
}))

@observer
class RequestItem extends React.Component<Props & WithStyles<ClassKeys>> {
	render() {
		return(
			<ListItem disableGutters className={this.props.classes.root}>
				<ListItemText
					primary={
						<RequestItemTitle
							title={this.props.request.pallet.getName()}
							time={new Date()}
						/>
					}
					secondary={this.props.request.location}
				>
					test
				</ListItemText>

				<ListItemSecondaryAction>
					<IconButton aria-label="Delete">
						<BlockIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

export default decorate(RequestItem)