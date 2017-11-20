import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'
import Card from 'material-ui/Card'

import PalletStore from '../../../stores/PalletStore'

import Map from './Map'

interface Props {
	pallets: PalletStore
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
		width: 1000,
		overflow: 'hidden'
	}
}))

@observer
class PalletMapView extends React.Component<Props & WithStyles<ClassNames>> {

	render() {
		return(
			<Card className={this.props.classes.root}>
				<Map pallets={this.props.pallets} />
			</Card>
		)
	}
}

export default decorate(PalletMapView)