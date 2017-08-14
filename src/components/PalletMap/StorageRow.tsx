import * as React from 'react'

import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import { PalletStorageRow } from '../../stores/PalletStore'

import Storage from './Storage'

interface Props {
	row: PalletStorageRow
}

const StorageRow: React.SFC<Props> = (props) => {
	const style = {
		display: 'flex'
	}

	return (
		<div style={style}>
			{props.row.storages.map(storage => (
				<Storage
					key={storage.id}
					storage={storage}
				/>
			))}
		</div>
	)
}

export default StorageRow