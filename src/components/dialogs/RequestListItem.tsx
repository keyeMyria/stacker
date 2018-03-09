import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as csLocale from 'date-fns/locale/cs'
import * as React from 'react'

import { ListItem } from 'material-ui/List'
import Typography from 'material-ui/Typography'

import { grey } from 'material-ui/colors'
import { withStyles, WithStyles } from 'material-ui/styles'

import Request from '../../models/Request'

interface Props {
	request: Request
}

type ClassNames = 'text' | 'textLight'

const decorate = withStyles<ClassNames>(() => ({
	text: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingTop: 4,
		paddingBottom: 4
	},
	textLight: {
		color: grey[500]
	}
}))

const RequestListItem: React.SFC<Props & WithStyles<ClassNames>> = (props) => {
	const timeToNow = distanceInWordsToNow(
		props.request.requestedAt,
		{ addSuffix: true, locale: csLocale }
	)

	return(
		<ListItem disableGutters className={props.classes.text}>
			<Typography>
				<span className={props.classes.textLight}>&nbsp;Do&nbsp;</span>
				{props.request.location}
				<span className={props.classes.textLight}>&nbsp;zadal(a)&nbsp;</span>
				{props.request.requester}
			</Typography>
			<Typography className={props.classes.textLight}>
				{timeToNow}
			</Typography>
		</ListItem>
	)
}

export default decorate(RequestListItem)
