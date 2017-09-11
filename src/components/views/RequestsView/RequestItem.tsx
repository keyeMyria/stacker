import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import { withStyles, StyleRules } from 'material-ui/styles'
import { grey, red } from 'material-ui/colors'

import ErrorOutline from 'material-ui-icons/ErrorOutline'

import { Pallet } from '../../../stores/PalletStore'

import Minimap from '../../common/Minimap'

interface Props {
	pallet: Pallet
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
		height: 64,
		cursor: 'pointer',
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
		paddingLeft: 8,
		paddingRight: 8,
		borderRight: '1px solid black',
		borderRightColor: grey[300],
		background: red['A400'],
		color: 'white'
	},
	main: {
		display: 'flex',
		justifyContent: 'space-between',
		width: 200,
		padding: '8px 16px',
		borderRight: '1px solid',
		borderRightColor: grey[300]
	},
	header: {
		display: 'flex',
		flexDirection: 'column'
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
				{this.props.pallet.isEmpty &&
					<div className={this.props.classes.priority}>
						<ErrorOutline />
					</div>
				}

				<div className={this.props.classes.main}>
					<div className={this.props.classes.header}>
						<Typography type="title">
							{this.props.pallet.getName()}
						</Typography>
						<Typography>
							Test
						</Typography>
					</div>

					<Typography type="body1">
						před 4 minutami
					</Typography>
				</div>

				<div className={this.props.classes.map}>
					<Minimap
						scale={3}
						side={this.props.pallet.side}
						x={this.props.pallet.column}
						y={this.props.pallet.getRowNumber()}
					/>
				</div>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestItem)