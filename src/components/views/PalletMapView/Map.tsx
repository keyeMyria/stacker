import { observer } from 'mobx-react'
import * as R from 'ramda'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import PalletStore from '../../../stores/PalletStore'
import MapPallet from './MapPallet'

interface Props {
	pallets: PalletStore
}

type ClassNames = 'root' | 'columnLegend'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'grid',
		overflow: 'auto',
		gridGap: '4px 4px'
	},
	columnLegend: {
		height: 28,
		paddingTop: 4,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
}))

@observer
class Map extends React.Component<Props & WithStyles<ClassNames>> {
	mapColumns(): JSX.Element[] {
		const pallets = this.props.pallets.pallets
		const columns: JSX.Element[] = []

		const leftPallets = pallets.filter(p => p.side === 'left')
		const rightPallets = pallets.filter(p => p.side === 'right')

		for (let i = 0; i < Math.max(...pallets.map(p => p.column)); i++) {
			const style = {
				gridColumn: i + 1,
				gridRow: 1
			}

			columns.push(
				<Typography
					key={'c' + i}
					style={style}
					className={this.props.classes.columnLegend}
				>
					{i + 1}
				</Typography>
			)
		}

		for (let i = 0; i < R.max(leftPallets.length, rightPallets.length); i++) {
			const style = {
				gridColumn: leftPallets[i].column,
				gridRow: leftPallets[i].row + 1
			}

			columns.push(
				<MapPallet
					key={i}
					palletPair={[leftPallets[i], rightPallets[i]]}
					style={style}
				/>
			)
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
