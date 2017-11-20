import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import { withStyles, WithStyles } from 'material-ui/styles'
import { lighten } from 'material-ui/styles/colorManipulator'
import { orange } from 'material-ui/colors'

import Pallet from '../../../stores/common/Pallet'

interface Props {
	palletPair: Pallet[]
}

type ClassNames = 'root' | 'name'

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		display: 'flex',
		alignItems: 'flex-end',
		width: 64,
		height: 64,
		background: orange[500],
		marginBottom: 2,
		'&:last-child': {
			marginBottom: 0
		}
	},
	name: {
		width: '100%',
		background: lighten(orange[500], 0.2),
		textAlign: 'center'
	}
}))

@observer
class MapPallet extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<Typography className={this.props.classes.name}>
					{this.props.palletPair[0].getName()}
				</Typography>
			</div>
		)
	}
}

export default decorate(MapPallet)