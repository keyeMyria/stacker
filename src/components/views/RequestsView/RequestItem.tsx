import * as React from 'react'
import { observer } from 'mobx-react'

import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { withStyles, StyleRules } from 'material-ui/styles'

import { Pallet } from '../../../stores/PalletStore'

import Minimap from '../../common/Minimap'

interface Props {
	pallet: Pallet
}

interface ClassNames {
	root: string,
	title: string,
	header: string,
	map: string
}

const styles: StyleRules = {
	root: {
		padding: '8px 16px',
		width: 368
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	header: {
		display: 'flex',
	},
	map: {
		width: 332,
		height: 32
	}
}

@observer
class RequestItem extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<div className={this.props.classes.title}>
					<div className={this.props.classes.header}>
						<Avatar>!</Avatar>
						<Typography type="headline">
							{this.props.pallet.getName()}
						</Typography>
					</div>

					<Typography type="body1">
						před 4 minutami
					</Typography>
				</div>

				<Minimap
					scale={3}
					side={this.props.pallet.side}
					x={this.props.pallet.column}
					y={this.props.pallet.getRowNumber()}
				/>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestItem)