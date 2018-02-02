import * as React from 'react'
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as csLocale from 'date-fns/locale/cs'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'
import { ListItem, ListItemSecondaryAction } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'

import PalletRequest from '../../../stores/interfaces/PalletRequest'

interface Props {
	request: PalletRequest,
	actionName: string,
	actionIcon: React.ReactElement<any>,
	handleAction: (event: React.MouseEvent<HTMLElement>) => void
}

type ClassNames = 'root' | 'content' | 'text' | 'textLight' | 'icon'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		paddingTop: 8,
		paddingBottom: 8,
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	content: {
		flex: '1 1 auto'
	},
	text: {
		width: '100%',
		boxSizing: 'border-box',
		paddingRight: 24,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	textLight: {
		color: grey[500]
	},
	icon: {
		top: 8,
		width: 32,
		height: 32
	}
}))

@observer
class RequestListItemUser extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		const request = this.props.request

		const text = (
			<div className={this.props.classes.text}>
				<Typography type="subheading">
					{request.pallet.getName()}
					<span className={this.props.classes.textLight}>&nbsp;do&nbsp;</span>
					{request.location}
				</Typography>
				<Typography className={this.props.classes.textLight}>
					{distanceInWordsToNow(
						this.props.request.requestedAt,
						{ addSuffix: true, locale: csLocale }
					)}
				</Typography>
			</div>
		)

		return(
			<ListItem
				disableGutters
				className={this.props.classes.root}
			>
				{text}

				<ListItemSecondaryAction>
					<Tooltip id="tooltip-cancel" title={this.props.actionName}>
						<IconButton
							aria-label={this.props.actionName}
							onClick={this.props.handleAction}
							className={this.props.classes.icon}
						>
							{this.props.actionIcon}
						</IconButton>
					</Tooltip>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

export default decorate(RequestListItemUser)