import { observer } from 'mobx-react'
import * as React from 'react'

import Card from 'material-ui/Card'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles, WithStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import Pallet from '../../../models/Pallet'
import PalletStore from '../../../stores/PalletStore'

import Map from './Map'

interface Props {
	pallets: PalletStore
}

interface State {
	loading: boolean
}

type ClassNames = 'root' | 'rowLegend' | 'rowLegendLetter'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
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
		marginBottom: 4
	}
}))

@observer
class PalletMapView extends React.Component<Props & WithStyles<ClassNames>, State> {
	state = {
		loading: true
	}

	componentDidMount() {
		this.setState({ loading: false })
	}

	mapRowLegend(): JSX.Element[] {
		const rows: JSX.Element[] = []
		for (let i = 0; i < this.props.pallets.rowCount; i++) {
			rows.push(
				<Typography key={i} className={this.props.classes.rowLegendLetter}>
					{Pallet.rowChar(i)}
				</Typography>
			)
		}
		return rows
	}

	render() {
		if (this.state.loading) {
			return(<CircularProgress size={128} />)
		}

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
