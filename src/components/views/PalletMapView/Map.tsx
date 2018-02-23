import * as React from 'react'
import { observer } from 'mobx-react'
import * as R from 'ramda'

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
		display: 'grid',
		overflow: 'auto',
		gridGap: '4px 4px'
	}
}))

@observer
class Map extends React.Component<Props & WithStyles<ClassNames>> {
	mapColumns(): JSX.Element[] {
		let columns: JSX.Element[] = []
		
		let leftPallets = this.props.pallets.pallets.filter(p => p.side === 'left')
		let rightPallets = this.props.pallets.pallets.filter(p => p.side === 'right')
		
		for(let i = 0; i < R.max(leftPallets.length, rightPallets.length); i++) {
			const style = { gridColumn: leftPallets[i].column, gridRow: leftPallets[i].row }
			columns.push(<MapPallet
				key={i}
				palletPair={[leftPallets[i], rightPallets[i]]}
				style={style}
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