import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as csLocale from 'date-fns/locale/cs'
import * as React from 'react'

import { grey } from 'material-ui/colors'
import { withStyles, WithStyles } from 'material-ui/styles'

import { ListItem } from 'material-ui/List'
import Typography from 'material-ui/Typography'

import Request from '../../../models/Request'

interface Props {
	request: Request
}

type ClassNames = 'root' | 'content' | 'text' | 'textLight'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		width: 500,
		paddingTop: 4,
		paddingBottom: 4
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
	}
}))

class RequestListItem extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		const { requestedAt, deliveredAt, returnedAt } = this.props.request

		const timeAt = returnedAt ? returnedAt : deliveredAt ? deliveredAt : requestedAt
		const timeToNow = distanceInWordsToNow(
			timeAt,
			{ addSuffix: true, locale: csLocale }
		)

		const text = (
			<div className={this.props.classes.text}>
				<Typography variant="subheading">
					{this.props.request.palletName}
					<span className={this.props.classes.textLight}>&nbsp;do&nbsp;</span>
					{this.props.request.location}
					<span className={this.props.classes.textLight}>&nbsp;zadal(a)&nbsp;</span>
					{this.props.request.requester}
				</Typography>
				<Typography className={this.props.classes.textLight}>
					{timeToNow}
				</Typography>
			</div>
		)

		return(
			<ListItem disableGutters className={this.props.classes.root}>
				<div className={this.props.classes.content}>
					{text}
				</div>
			</ListItem>
		)
	}
}

export default decorate(RequestListItem)
