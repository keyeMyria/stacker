import * as React from 'react'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import { PalletStorage } from '../../stores/PalletStore'

interface Props {
	storage: PalletStorage
}

const Storage: React.SFC<Props> = (props) => {
	const style = {
		margin: 8,
		width: 64,
		minWidth: 'unset',
		height: 64,
		cursor: 'pointer'
	}

	return (
		<Button raised
			style={style}
		>
			<Typography type="body1" component="p">
				{props.storage.palletName}
			</Typography>
		</Button>
	)
}

export default Storage