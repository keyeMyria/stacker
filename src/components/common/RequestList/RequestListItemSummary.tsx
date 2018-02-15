import * as React from 'react'
import * as format from 'date-fns/format'
import * as distanceInWords from 'date-fns/distance_in_words'
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as csLocale from 'date-fns/locale/cs'
import * as classnames from 'classnames'

import { withStyles, WithStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'
import { ListItem, ListItemSecondaryAction } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'

import PalletRequest from '../../../stores/interfaces/PalletRequest'
import { formatPriority } from '../../../helpers/priority'

const timeFormat: string = 'H:mm'
const dateFormat: string = ', D. M. YYYY'

interface Props {
	request: PalletRequest
}

interface State {
	expand: boolean
}

type ClassNames = 'root' | 'content' | 'text' | 'textLight' | 'section' | 'infoItem' | 'expandButton'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		width: 500,
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
		width: 100
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

		const text = (
			<div className={this.props.classes.text}>
				<Typography>
					{request.pallet.name}
					<span className={this.props.classes.textLight}>&nbsp;do&nbsp;</span>
					{request.location}
					<span className={this.props.classes.textLight}>&nbsp;zadal(a)&nbsp;</span>
					{request.requester}
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
					<Typography>
						<span className={this.props.classes.infoItem}>
							Doručeno:
						</span>
						<span>
							{format(request.requestedAt, timeFormat, csLocale)}
						</span>
						<span className={
							classnames(this.props.classes.textLight, this.props.classes.infoItem)
						}>
							{format(request.requestedAt, dateFormat, csLocale)}
						</span>
						<span>
							{distanceInWords(request.requestedAt, new Date(), { locale: csLocale})}
						</span>
					</Typography>
					<Typography>
						<span className={this.props.classes.infoItem}>
							Vráceno:
						</span>
						<span>
							{format(request.requestedAt, timeFormat, csLocale)}
						</span>
						<span className={
							classnames(this.props.classes.textLight, this.props.classes.infoItem)
						}>
							{format(request.requestedAt, dateFormat, csLocale)}
						</span>
						<span>
							{distanceInWords(request.requestedAt, new Date(), { locale: csLocale})}
						</span>
					</Typography>
					<Typography>
						<span className={
							classnames(this.props.classes.infoItem, this.props.classes.section)
						}>
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