import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, StyleRules } from 'material-ui/styles'
import Card from 'material-ui/Card'

import PalletStore from '../../stores/PalletStore'

import StorageRow from './StorageRow'
import SideSwitcher from './SideSwitcher'

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
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 32
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
			<Card className={this.props.classes.root}>
				<SideSwitcher store={this.props.store} />

				<div className={this.props.classes.map}>
					{this.mapStorageRows()}
				</div>
			</Card>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(PalletMap)