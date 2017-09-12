import * as React from 'react'
import { observer } from 'mobx-react'
import * as moment from 'moment'

import Typography from 'material-ui/Typography'
import { withStyles, StyleRules } from 'material-ui/styles'
import { grey, red } from 'material-ui/colors'

// import ErrorOutline from 'material-ui-icons/ErrorOutline'

import { PalletRequest } from '../../../stores/PalletStore'

import Minimap from '../../common/Minimap'

interface Props {
	request: PalletRequest
}

interface ClassNames {
	root: string,
	priority: string,
	main: string,
	header: string,
	map: string
}

const styles: StyleRules = {
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		height: 80,
		cursor: 'pointer',
		borderBottom: '1px solid',
		borderBottomColor: grey[300],
		'&:hover': {
			backgroundColor: grey[100]
		},
		'&:active': {
			backgroundColor: grey[200]
		}
	},
	priority: {
		display: 'flex',
		alignItems: 'center',
		width: 6,
		background: red['A400'],
		color: 'white'
	},
	main: {
		display: 'flex',
		justifyContent: 'space-between',
		width: 400,
		padding: '8px 16px',
		// borderRight: '1px solid',
		// borderRightColor: grey[300]
	},
	header: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	map: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: 16,
		paddingRight: 16
	}
}

@observer
class RequestItem extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				{this.props.request.priority === 'urgent' &&
					<div className={this.props.classes.priority}>
					</div>
				}

				<div className={this.props.classes.map}>
					<Minimap
						scale={3}
						side={this.props.request.pallet.side}
						x={this.props.request.pallet.column}
						y={this.props.request.pallet.getRowNumber()}
					/>
				</div>

				<div className={this.props.classes.main}>
					<div className={this.props.classes.header}>
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

					<Typography type="caption">
						{moment(this.props.request.requestedAt).locale('cs').fromNow()}
					</Typography>
				</div>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestItem)