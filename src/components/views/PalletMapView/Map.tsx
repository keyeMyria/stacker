import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import PalletStore from '../../../stores/PalletStore'
// import MapColumn from './MapColumn'
import MapPallet from './MapPallet'

interface Props {
	pallets: PalletStore
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'grid'
	}
}))

@observer
class Map extends React.Component<Props & WithStyles<ClassNames>> {
	mapColumns(): JSX.Element[] {
		let columns: JSX.Element[] = []

		for(let i = 0; i < this.props.pallets.pallets.length; i + 1) {
			columns.push(<MapPallet
				key={i}
				palletPair={[this.props.pallets.pallets[i], this.props.pallets.pallets[i + 1]]}
			/>)
		}

		return columns
	}

	render() {
		return(
			<div className={this.props.classes.root}>
				{this.mapColumns()}
			</div>
		)
	}
}

export default decorate(Map)