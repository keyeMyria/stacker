import * as React from 'react'
import { observer } from 'mobx-react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import { withStyles, StyleRules } from 'material-ui/styles'

import PalletStore, { Pallet } from '../../stores/PalletStore'

import StorageRow from './StorageRow'

interface Props {
	store: PalletStore
}

interface ClassNames {
	root: string,
	map: string
}

const styles: StyleRules = {
	root: {
		display: 'flex',
		justifyContent: 'center',
	},
	map: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		marginLeft: 32,
		marginRight: 32
	}
}

@observer
class PalletMap extends React.Component<Props & { classes: ClassNames }> {
	mapStorageRows(): JSX.Element[] {
		let rows: JSX.Element[] = []
		for(let i = 0; i < this.props.store.rowCount; i++) {
			rows.push(
				<StorageRow
					key={i}
					row={this.props.store.getPalletsFromRowByIndex(
						this.props.store.showSide, i
					)}
				/>
			)
		}

		return rows
	}

	render() {
		return(
			<div className={this.props.classes.root}>
				<FormControl>
					<FormLabel>Stacker side</FormLabel>
					<RadioGroup
						aria-label="map"
						name="map"
						value={this.props.store.showSide}
						onChange={(e, v) => this.props.store.switchSide(v)}
					>
						<FormControlLabel value="left" control={<Radio />} label="Left" />
						<FormControlLabel value="right" control={<Radio />} label="Right" />
					</RadioGroup>
				</FormControl>

				<div className={this.props.classes.map}>
					{this.mapStorageRows()}
				</div>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(PalletMap)