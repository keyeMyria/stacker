import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { withStyles, WithStyles } from 'material-ui/styles'
import { common } from 'material-ui/colors'

import RequestItem from './RequestItem'

import RequestsStore from '../../../stores/RequestsStore'

interface Props {
	store: RequestsStore
}

type ClassKeys = (
	'root'
	| 'headline'
)

const decorate = withStyles<ClassKeys>(() => ({
	root: {
	},
	headline: {
		color: common['minBlack'],
		marginBottom: 8
	}
}))

@observer
class RequestList extends React.Component<Props & WithStyles<ClassKeys>> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<Typography type="headline" className={this.props.classes.headline}>
					Zažádané palety
				</Typography>

				<Paper>
					{this.props.store.requests
					.filter(r => r.status !== 'delivered')
					.map(r => (
						<RequestItem
							key={r.id}
							request={r}
							deliver={() => this.props.store.deliver(r.id)}
						/>
					))}
				</Paper>
			</div>
		)
	}
}

export default decorate(RequestList)