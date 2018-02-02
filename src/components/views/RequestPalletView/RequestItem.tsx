import * as React from 'react'
import { observer } from 'mobx-react'

import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Tooltip from 'material-ui/Tooltip'
import IconButton from 'material-ui/IconButton'
import BlockIcon from 'material-ui-icons/Block'
import ForwardIcon from 'material-ui-icons/Forward'
import { withStyles, WithStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'

import PalletRequest from '../../../stores/interfaces/PalletRequest'

interface Props {
	request: PalletRequest,
	handleCancel: () => void,
	handleReturn: () => void
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
		const cancelButton = (
			<Tooltip id="tooltip-cancel" title="Zrušit">
				<IconButton aria-label="Cancel" onClick={this.props.handleCancel}>
					<BlockIcon />
				</IconButton>
			</Tooltip>
		)

		const returnButton = (
			<Tooltip id="tooltip-return" title="Vrátit">
				<IconButton aria-label="Return" onClick={this.props.handleReturn}>
					<ForwardIcon />
				</IconButton>
			</Tooltip>
		)

		return(
			<ListItem disableGutters className={this.props.classes.root}>
				<ListItemText
					primary=""
					secondary={this.props.request.location}
				>
				</ListItemText>

				<ListItemSecondaryAction>
					{this.props.request.status === 'delivered' ? returnButton : cancelButton}
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

export default decorate(RequestItem)