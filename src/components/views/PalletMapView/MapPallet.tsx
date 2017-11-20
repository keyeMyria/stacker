import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import Pallet from '../../../stores/common/Pallet'

interface Props {
	pallet: Pallet
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex'
	}
}))

@observer
class MapPallet extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		return(
			<div className={this.props.classes.root}>
				{this.props.pallet.getName()}
			</div>
		)
	}
}

export default decorate(MapPallet)