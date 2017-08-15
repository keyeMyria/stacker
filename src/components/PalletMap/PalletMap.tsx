import * as React from 'react'
import { observer } from 'mobx-react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import PalletStore, { PalletStorageRow } from '../../stores/PalletStore'

import StorageRow from './StorageRow'

interface Props {
	store: PalletStore
}

interface Style {

}

@observer
export default class PalletMap extends React.Component<Props> {
	render() {
		const style: React.CSSProperties = {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			alignContent: 'center'
		}

		return(
			<div style={style}>
				{this.props.store.storageRows.map((row: PalletStorageRow) => (
					<StorageRow key={row.id} row={row} />
				))}
			</div>
		)
	}
}