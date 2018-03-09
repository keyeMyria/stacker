import * as classnames from 'classnames'
import * as distanceInWords from 'date-fns/distance_in_words'
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as format from 'date-fns/format'
import * as csLocale from 'date-fns/locale/cs'
import * as React from 'react'

import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import { grey } from 'material-ui/colors'
import IconButton from 'material-ui/IconButton'
import { ListItem, ListItemSecondaryAction } from 'material-ui/List'
import { withStyles, WithStyles } from 'material-ui/styles'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'

import { formatPriority, formatStatus } from '../../../helpers/priority'
import Request from '../../../models/Request'

const timeFormat: string = 'H:mm'
const dateFormat: string = ', D. M. YYYY'

interface Props {
	request: Request
}

interface State {
	expand: boolean
}

type ClassNames = 'root' | 'content' | 'text' | 'textLight' | 'section' | 'infoItem' | 'expandButton'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		paddingTop: 8,
		paddingBottom: 8,
		flexDirection: 'column',
		alignItems: 'flex-start',
		cursor: 'pointer'
	},
	content: {
		flex: '1 1 auto'
	},
	text: {
		width: '100%',
		boxSizing: 'border-box',
		paddingRight: 24,
		display: 'flex',
		justifyContent: 'space-between'
	},
	textLight: {
		color: grey[500]
	},
	section: {
		marginTop: 8
	},
	infoItem: {
		display: 'inline-block',
		width: 120
	},
	expandButton: {
		top: 18
	}
}))

class RequestListItemSummary extends React.Component<Props & WithStyles<ClassNames>, State> {
	state: State = {
		expand: false
	}

	handleToggleExpand = () => {
		this.setState({ expand: !this.state.expand })
	}

	render() {
		const request = this.props.request

		const requestedAt = distanceInWordsToNow(
			this.props.request.requestedAt,
			{ addSuffix: true, locale: csLocale }
		)

		const text = (
			<div className={this.props.classes.text}>
				<Typography>
					{request.palletName}
					<span className={this.props.classes.textLight}>&nbsp;do&nbsp;</span>
					{request.location}
					<span className={this.props.classes.textLight}>&nbsp;zadal(a)&nbsp;</span>
					{request.requester}
				</Typography>
				<Typography className={this.props.classes.textLight}>
					{requestedAt}
				</Typography>
			</div>
		)

		const infoClasses = classnames(
			this.props.classes.textLight,
			this.props.classes.infoItem
		)
		const infoPriorityClasses = classnames(
			this.props.classes.section,
			this.props.classes.infoItem
		)

		const deliveredTimes = (
			<Typography>
				<span className={this.props.classes.infoItem}>
					Doručeno:
				</span>
				<span>
					{format(request.deliveredAt, timeFormat, csLocale)}
				</span>
				<span className={infoClasses}>
					{format(request.deliveredAt, dateFormat, csLocale)}
				</span>
				<span>
					{distanceInWords(request.deliveredAt, request.requestedAt, { locale: csLocale})}
				</span>
			</Typography>
		)

		const returnedTimes = (
			<Typography>
				<span className={this.props.classes.infoItem}>
				Vráceno:
				</span>
				<span>
					{format(request.returnedAt, timeFormat, csLocale)}
				</span>
				<span className={infoClasses}>
					{format(request.returnedAt, dateFormat, csLocale)}
				</span>
				<span>
					{distanceInWords(request.returnedAt, request.deliveredAt, { locale: csLocale})}
				</span>
			</Typography>
		)

		return(
			<ListItem
				divider
				className={this.props.classes.root}
				onClick={this.handleToggleExpand}
			>
				{text}
				<Collapse
					in={this.state.expand}
					timeout="auto"
					unmountOnExit
					className={this.props.classes.section}
				>
					<Typography>
						<span className={this.props.classes.infoItem}>
							Zažádáno:
						</span>
						<span>
							{format(request.requestedAt, timeFormat, csLocale)}
						</span>
						<span className={this.props.classes.textLight}>
							{format(request.requestedAt, dateFormat, csLocale)}
						</span>
					</Typography>
					{request.deliveredAt && deliveredTimes}
					{request.returnedAt && returnedTimes}
					<Typography>
						<span className={infoPriorityClasses}>
							Status:
						</span>
						<span>
							{formatStatus(request.statusName)}
						</span>
					</Typography>
					<Typography>
						<span className={infoPriorityClasses}>
							Priorita:
						</span>
						<span>
							{formatPriority(request.priority)}
						</span>
					</Typography>
				</Collapse>
				<ListItemSecondaryAction className={this.props.classes.expandButton}>
					<IconButton disableRipple aria-label="Delete" onClick={this.handleToggleExpand}>
						{this.state.expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

export default decorate(RequestListItemSummary)
