import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'
import Card from 'material-ui/Card'
import Typography from 'material-ui/Typography'

import PalletStore from '../../../stores/PalletStore'
import Pallet from '../../../models/Pallet'

import Map from './Map'

interface Props {
	pallets: PalletStore
}

type ClassNames = 'root' | 'rowLegend' | 'rowLegendLetter'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
		width: 1000,
		overflow: 'hidden'
	},
	rowLegend: {
		display: 'flex',
		flexDirection: 'column',
		minWidth: 32,
		marginTop: 32
	},
	rowLegendLetter: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 64,
		marginBottom: 2
	}
}))

@observer
class PalletMapView extends React.Component<Props & WithStyles<ClassNames>> {
	mapRowLegend(): JSX.Element[] {
		let rows: JSX.Element[] = []
		for(let i = 0; i < this.props.pallets.rowCount; i++) {
			rows.push(
				<Typography key={i} className={this.props.classes.rowLegendLetter}>
					{Pallet.rowChar(i)}
				</Typography>
			)
		}
		return rows
	}

	render() {
		return(
			<Card className={this.props.classes.root}>
				<div className={this.props.classes.rowLegend}>
					{this.mapRowLegend()}
				</div>

				<Map pallets={this.props.pallets} />

				<div className={this.props.classes.rowLegend}>
					{this.mapRowLegend()}
				</div>
			</Card>
		)
	}
}

export default decorate(PalletMapView)