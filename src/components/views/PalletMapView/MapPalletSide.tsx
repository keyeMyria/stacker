import * as React from 'react'
import { observer } from 'mobx-react'
import * as classnames from 'classnames'

import Typography from 'material-ui/Typography'
import { withStyles, WithStyles } from 'material-ui/styles'
import { lighten } from 'material-ui/styles/colorManipulator'
import { orange, grey } from 'material-ui/colors'

import Pallet from '../../../stores/common/Pallet'

interface Props {
	pallet: Pallet
}

type ClassNames = 'root' | 'name' | 'rootEmpty' | 'nameEmpty'

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 64,
		height: 32,
		background: orange[500],
		cursor: 'pointer',
		'&:hover': {
			background: lighten(orange[500], 0.2)
		}
	},
	name: {
		width: '100%',
		background: lighten(orange[500], 0.2),
		textAlign: 'center'
	},
	rootEmpty: {
		background: grey[500],
		'&:hover': {
			background: lighten(grey[500], 0.2)
		}
	},
	nameEmpty: {
		background: lighten(grey[500], 0.2)
	}
}))

@observer
class MapPallet extends React.Component<Props & WithStyles<ClassNames>> {
	render() {		
		return(
			<div className={classnames(
					this.props.classes.root,
					{ [this.props.classes.rootEmpty]: this.props.pallet.isEmpty }
				)}
			>
				<Typography
					className={classnames(
						this.props.classes.name,
						{ [this.props.classes.nameEmpty]: this.props.pallet.isEmpty }
					)}
				>
					{this.props.pallet.getName()}
				</Typography>
			</div>
		)
	}
}

export default decorate(MapPallet)