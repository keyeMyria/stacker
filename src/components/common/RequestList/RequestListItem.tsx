import * as React from 'react'
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as csLocale from 'date-fns/locale/cs'

import { withStyles, WithStyles } from 'material-ui/styles'
import { ListItem } from 'material-ui/List'
import Typography from 'material-ui/Typography'

import PalletRequest from '../../../stores/interfaces/PalletRequest'

interface Props {
	request: PalletRequest
}

type ClassNames = 'root' | 'content' | 'primaryText'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		width: 500,
		paddingTop: 4,
		paddingBottom: 4
	},
	content: {
		flex: '1 1 auto'
	},
	primaryText: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	}
}))

class RequestListItem extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		const primaryText = (
			<div className={this.props.classes.primaryText}>
				<Typography type="subheading">
					{this.props.request.pallet.getName()}
				</Typography>
				<Typography type="caption">
					{distanceInWordsToNow(
						this.props.request.requestedAt,
						{ addSuffix: true, locale: csLocale }
					)}
				</Typography>
			</div>
		)

		const secondaryText = (
			<Typography>
				{this.props.request.requester}, {this.props.request.location}
			</Typography>
		)

		return(
			<ListItem disableGutters className={this.props.classes.root}>
				<div className={this.props.classes.content}>
					{primaryText}
					{secondaryText}
				</div>
			</ListItem>
		)
	}
}

export default decorate(RequestListItem)