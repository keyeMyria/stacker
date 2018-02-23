import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import Pallet from '../../../models/Pallet'

import MapPalletSide from './MapPalletSide'

interface Props {
	palletPair: Pallet[],
	style: any
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		width: 64,
		height: 64,
		display: 'flex'
	}
}))

@observer
class MapPallet extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		return(
			<div style={this.props.style} className={this.props.classes.root}>
				<MapPalletSide pallet={this.props.palletPair[0]} />

				<MapPalletSide pallet={this.props.palletPair[1]} />
			</div>
		)
	}
}

export default decorate(MapPallet)
