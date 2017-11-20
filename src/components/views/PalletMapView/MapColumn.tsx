import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import Pallet from '../../../stores/common/Pallet'
import MapPallet from './MapPallet'

interface Props {
	palletPairs: Pallet[][]
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		marginRight: 2,
		'&:last-child': {
			marginRight: 0
		}
	}
}))

@observer
class MapColumn extends React.Component<Props & WithStyles<ClassNames>> {
	mapPallets(): JSX.Element[] {
		let pallets: JSX.Element[] = []
		for(let pallet of this.props.palletPairs) {
			pallets.push(<MapPallet key={pallet[0].id} palletPair={pallet} />)
		}
		return pallets
	}

	render() {
		return(
			<div className={this.props.classes.root}>
				{this.mapPallets()}
			</div>
		)
	}
}

export default decorate(MapColumn)