import * as React from 'react'
import { observer } from 'mobx-react'
import * as classnames from 'classnames'

import Typography from 'material-ui/Typography'
import { withStyles, WithStyles } from 'material-ui/styles'
import { lighten } from 'material-ui/styles/colorManipulator'
import { grey, common, deepOrange } from 'material-ui/colors'

import Pallet from '../../../models/Pallet'

import PalletDialog from '../../dialogs/PalletDialog'

interface Props {
	pallet: Pallet
}

interface State {
	open: boolean
}

type ClassNames = 'root' | 'name' | 'rootEmpty'

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 32,
		height: 64,
		background: grey[300],
		cursor: 'pointer',
		'&:hover': {
			background: lighten(grey[300], 0.4)
		}
	},
	name: {
		width: '100%',
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 500,
		color: common['white']
	},
	rootEmpty: {
		background: deepOrange[100],
		'&:hover': {
			background: lighten(deepOrange[100], 0.4)
		}
	}
}))

@observer
class MapPallet extends React.Component<Props & WithStyles<ClassNames>, State> {
	state: State = {
		open: false
	}

	handleDialogOpen = () => {
		this.setState({ open: true })
	}

	handleDialogClose = () => {
		this.setState({ open: false })
	}

	render() {
		return[
			<div className={classnames(
					this.props.classes.root,
					{ [this.props.classes.rootEmpty]: this.props.pallet.isEmpty }
				)}
				onClick={this.handleDialogOpen}
				key="content"
			>
				<Typography className={this.props.classes.name}>
					{this.props.pallet.side === 'left' ? 'L' : 'R'}
				</Typography>
			</div>
		,
			<PalletDialog
				open={this.state.open}
				handleClose={this.handleDialogClose}
				pallet={this.props.pallet}
				key="dialog"
			/>
		]
	}
}

export default decorate(MapPallet)