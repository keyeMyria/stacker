import * as React from 'react'
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as csLocale from 'date-fns/locale/cs'

import { withStyles, WithStyles } from 'material-ui/styles'
import { common } from 'material-ui/colors'
import { ListItem, ListItemText } from 'material-ui/List'

import PalletRequest from '../../../stores/interfaces/PalletRequest'

interface Props {
	request: PalletRequest
}

type ClassNames = 'root' | 'primaryText' | 'dateAt'

const decorate = withStyles<ClassNames>(() => ({
	root: {},
	primaryText: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	},
	dateAt: {
		fontSize: 12,
		lineHeight: 1,
		color: common['lightBlack']
	}
}))

class RequestListItem extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		const primaryText = (
			<div className={this.props.classes.primaryText}>
				<div>
					{this.props.request.pallet.getName()}
				</div>
				<div className={this.props.classes.dateAt}>
					{distanceInWordsToNow(
						this.props.request.requestedAt,
						{ addSuffix: true, locale: csLocale }
					)}
				</div>
			</div>
		)

		const secondaryText = (
			<div>
				<div>
					{this.props.request.requester}
				</div>
				<div>
					{this.props.request.location}
				</div>
			</div>
		)

		return(
			<ListItem>
				<ListItemText
					primary={primaryText}
					secondary={secondaryText}
				/>
			</ListItem>
		)
	}
}

export default decorate(RequestListItem)