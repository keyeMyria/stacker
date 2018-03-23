import * as classnames from 'classnames'
import { observer } from 'mobx-react'
import * as React from 'react'

import { common, deepOrange, grey } from 'material-ui/colors'
import { withStyles, WithStyles } from 'material-ui/styles'
import { lighten } from 'material-ui/styles/colorManipulator'
import Typography from 'material-ui/Typography'

import Pallet from '../../../models/Pallet'
import PalletType from '../../../models/PalletType'

import PalletDialog from '../../dialogs/PalletDialog'

interface Props {
	pallet: Pallet
}

interface State {
	open: boolean
}

type ClassNames = (
	'root' |
	'name' |
	'rootEmpty' |
	'rootDisabled' |
	'types' |
	'type'
)

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		width: 40,
		height: 80,
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
		color: common.white
	},
	rootEmpty: {
		background: deepOrange[100],
		'&:hover': {
			background: lighten(deepOrange[100], 0.4)
		}
	},
	rootDisabled: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 80
	},
	types: {

	},
	type: {
		fontSize: '0.6rem',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
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

	mapType = (type: PalletType) => {
		return (
			<Typography
				key={type.id}
				variant="caption"
				className={this.props.classes.type}
			>
				{type.typeName}
			</Typography>
		)
	}

	render() {
		const { pallet } = this.props
		const types = pallet.types.slice(0, 4)

		if (this.props.pallet.isDisabled) {
			return(<div className={this.props.classes.rootDisabled} />)
		}

		const rootClasses = classnames(
			this.props.classes.root,
			{ [this.props.classes.rootEmpty]: this.props.pallet.isEmpty }
		)

		const content = [
			<div
				className={rootClasses}
				onClick={this.handleDialogOpen}
				key="content"
			>
				<Typography className={this.props.classes.name}>
					{this.props.pallet.side === 'left' ? 'L' : 'R'}
				</Typography>

				{types.map(this.mapType)}
			</div>
		]

		if (this.state.open) {
			content.push(
				<PalletDialog
					open={this.state.open}
					handleClose={this.handleDialogClose}
					pallet={this.props.pallet}
					key="dialog"
				/>
			)
		}

		return content
	}
}

export default decorate(MapPallet)
