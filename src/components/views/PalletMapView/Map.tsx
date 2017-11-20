import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import PalletStore from '../../../stores/PalletStore'
import MapColumn from './MapColumn'

interface Props {
	pallets: PalletStore
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
		overflowX: 'auto'
	}
}))

@observer
class Map extends React.Component<Props & WithStyles<ClassNames>> {
	mapColumns(): JSX.Element[] {
		let columns: JSX.Element[] = []
		for(let column of this.props.pallets.getColumns()) {
			columns.push(<MapColumn key={column[0].id} pallets={column} />)
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