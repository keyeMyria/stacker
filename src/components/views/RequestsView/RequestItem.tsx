import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as csLocale from 'date-fns/locale/cs'
import { observer } from 'mobx-react'
import * as React from 'react'

import { Color } from 'material-ui'
import { green, grey, orange, red, teal } from 'material-ui/colors'
import { withStyles, WithStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

// import ErrorOutline from 'material-ui-icons/ErrorOutline'

import PalletRequest from '../../../stores/interfaces/PalletRequest'

import Minimap from '../../common/Minimap'
import ItemActions from './ItemActions'

interface Props {
	request: PalletRequest,
	deliver: () => void,
	complete: () => void
}

type ClassKeys = (
	'root'
	| 'priority'
	| 'content'
	| 'main'
	| 'parameters'
	| 'side'
	| 'map'
)

const decorate = withStyles<ClassKeys>(() => ({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		height: 80,
		'&:hover': {
			backgroundColor: grey[100]
		},
		'&:last-child': {
			borderBottom: 'none'
		},
		'&:first-child $priority': {
			borderTopLeftRadius: 2
		},
		'&:last-child $priority': {
			borderBottomLeftRadius: 2,
			borderBottom: 'none'
		}
	},
	priority: {
		display: 'flex',
		alignItems: 'center',
		width: 8,
		borderBottom: '1px solid'
	},
	content: {
		display: 'flex',
		borderBottom: '1px solid',
		borderBottomColor: grey[300]
	},
	main: {
		display: 'flex',
		justifyContent: 'space-between',
		width: 400,
		padding: '8px 16px'
		// borderRight: '1px solid',
		// borderRightColor: grey[300]
	},
	parameters: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	side: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-end'
	},
	map: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: 16,
		paddingRight: 16
	}
}))

@observer
class RequestItem extends React.Component<Props & WithStyles<ClassKeys>> {
	getPriorityStyle(): React.CSSProperties {
		const priority = this.props.request.priority

		let color: Color

		if (priority === 'urgent') {
			color = red
		} else if (priority === 'high') {
			color = orange
		} else if (priority === 'standard') {
			color = green
		} else {
			color = teal
		}

		return {
			background: color[500],
			borderBottomColor: color[600]
		}
	}

	render() {
		if (this.props.request.pallet === undefined) {
			return null
		}

		const requestedAt = distanceInWordsToNow(
			this.props.request.requestedAt,
			{ addSuffix: true, locale: csLocale }
		)

		return(
			<div className={this.props.classes.root}>
				<div
					className={this.props.classes.priority}
					style={this.getPriorityStyle()}
				/>

				<div className={this.props.classes.content}>
					<div className={this.props.classes.map}>
						<Minimap
							scale={3}
							side={this.props.request.pallet.side}
							x={this.props.request.pallet.column}
							y={this.props.request.pallet.row}
						/>
					</div>

					<div className={this.props.classes.main}>
						<div className={this.props.classes.parameters}>
							<Typography variant="title">
								{this.props.request.pallet.name}
							</Typography>
							<div>
								<Typography>
									Žadatel: {this.props.request.requester}
								</Typography>
								<Typography>
									Umístění: {this.props.request.location}
								</Typography>
							</div>
						</div>

						<div className={this.props.classes.side}>
							<Typography variant="caption">
								{requestedAt}
							</Typography>

							<ItemActions
								status={this.props.request.status}
								deliver={this.props.deliver}
								complete={this.props.complete}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default decorate(RequestItem)
