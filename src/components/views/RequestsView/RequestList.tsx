import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { withStyles, StyleRules } from 'material-ui/styles'
import { common } from 'material-ui/colors'

import RequestItem from './RequestItem'

import { Pallet } from '../../../stores/PalletStore'

interface Props {
	pallets: Pallet[]
}

interface ClassNames {
	root: string,
	headline: string
}

const styles: StyleRules = {
	root: {
	},
	headline: {
		color: common['lightBlack'],
		marginBottom: 8
	}
}

@observer
class RequestList extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<Typography type="headline" className={this.props.classes.headline}>
					Requested pallets
				</Typography>

				<Paper>
					{this.props.pallets.map(p => <RequestItem key={p.id} pallet={p} />)}
				</Paper>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestList)