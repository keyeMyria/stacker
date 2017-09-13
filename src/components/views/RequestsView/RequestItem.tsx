import * as React from 'react'
import { observer } from 'mobx-react'
import * as moment from 'moment'

import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withStyles, StyleRules } from 'material-ui/styles'
import { grey, red, orange, green, teal } from 'material-ui/colors'

// import ErrorOutline from 'material-ui-icons/ErrorOutline'

import { PalletRequest } from '../../../stores/PalletStore'

import Minimap from '../../common/Minimap'

interface Props {
	request: PalletRequest
}

interface ClassNames {
	[key: string]: string,
	root: string,
	priority: string,
	priorityUrgent: string,
	main: string,
	parameters: string,
	side: string,
	map: string
}

const styles: StyleRules = {
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
	priorityUrgent: {
		background: red[500],
		borderBottomColor: red[600]
	},
	priorityHigh: {
		background: orange[500],
		borderBottomColor: orange[600]
	},
	priorityStandard: {
		background: green[500],
		borderBottomColor: green[600]
	},
	priorityLow: {
		background: teal[500],
		borderBottomColor: teal[600]
	},
	content: {
		display: 'flex',
		borderBottom: '1px solid',
		borderBottomColor: grey[300],
	},
	main: {
		display: 'flex',
		justifyContent: 'space-between',
		width: 400,
		padding: '8px 16px',
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
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

@observer
class RequestItem extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<div
					className={[
						this.props.classes.priority,
						this.props.classes['priority' + capitalize(this.props.request.priority)]
					].join(' ')}
				/>
				
				<div className={this.props.classes.content}>
					<div className={this.props.classes.map}>
						<Minimap
							scale={3}
							side={this.props.request.pallet.side}
							x={this.props.request.pallet.column}
							y={this.props.request.pallet.getRowNumber()}
						/>
					</div>

					<div className={this.props.classes.main}>
						<div className={this.props.classes.parameters}>
							<Typography type="title">
								{this.props.request.pallet.getName()}
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
							<Typography type="caption">
								{moment(this.props.request.requestedAt).locale('cs').fromNow()}
							</Typography>

							<Button raised color="primary">
								Deliver
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestItem)