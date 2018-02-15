import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import Pallet from '../../../models/Pallet'

import MapPalletSide from './MapPalletSide'

interface Props {
	palletPair: Pallet[]
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		width: 64,
		height: 64,
		marginBottom: 2,
		display: 'flex',
		'&:last-child': {
			marginBottom: 0
		}
	}
}))

@observer
class MapPallet extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<MapPalletSide pallet={this.props.palletPair[0]} />

				<MapPalletSide pallet={this.props.palletPair[1]} />
			</div>
		)
	}
}

export default decorate(MapPallet)