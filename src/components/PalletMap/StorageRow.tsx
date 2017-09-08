import * as React from 'react'

import { withStyles, StyleRules } from 'material-ui/styles'

import { Pallet } from '../../stores/PalletStore'

import Storage from './Storage'

interface Props {
	row: Pallet[]
}

interface ClassNames {
	root: string
}

const styles: StyleRules = {
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	}
}

const StorageRow: React.SFC<Props & { classes: ClassNames }> = (props) => {
	return (
		<div className={props.classes.root}>
			{props.row.map(p => (
				<Storage
					key={p.column}
					pallet={p}
				/>
			))}
		</div>
	)
}

export default withStyles<Props, ClassNames>(styles)(StorageRow)