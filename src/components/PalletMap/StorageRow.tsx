import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import Pallet from '../../stores/common/Pallet'

import Storage from './Storage'

interface Props {
	row: Pallet[]
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	}
}))

const StorageRow: React.SFC<Props & WithStyles<ClassNames>> = (props) => {
	return (
		<div className={props.classes.root}>
			{props.row.map(p => (
				<Storage pallet={p} key={p.id} />
			))}
		</div>
	)
}

export default decorate<Props>(StorageRow)