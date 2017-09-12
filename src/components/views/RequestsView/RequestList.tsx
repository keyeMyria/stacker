import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { withStyles, StyleRules } from 'material-ui/styles'
import { common } from 'material-ui/colors'

import RequestItem from './RequestItem'

import { PalletRequest } from '../../../stores/PalletStore'

interface Props {
	requests: PalletRequest[]
}

interface ClassNames {
	root: string,
	headline: string
}

const styles: StyleRules = {
	root: {
	},
	headline: {
		color: common['minBlack'],
		marginBottom: 8
	}
}

@observer
class RequestList extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<Typography type="headline" className={this.props.classes.headline}>
					Zažádané palety
				</Typography>

				<Paper>
					{this.props.requests.map(r => <RequestItem key={r.id} request={r} />)}
				</Paper>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestList)