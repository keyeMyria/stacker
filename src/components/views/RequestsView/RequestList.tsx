import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText } from 'material-ui/List'
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
	| 'requestList'
)

const decorate = withStyles<ClassKeys>(() => ({
	root: {
	},
	headline: {
		color: common['minBlack'],
		marginBottom: 8
	},
	requestList: {
		marginBottom: 32
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

				<Paper className={this.props.classes.requestList}>
					{this.props.store.getRequestsByStatus('requested').map(r => (
						<RequestItem
							key={r.id}
							request={r}
							deliver={() => this.props.store.deliver(r.id)}
							complete={() => this.props.store.complete(r.id)}
						/>
					))}
				</Paper>

				<Paper className={this.props.classes.requestList}>
					{this.props.store.getRequestsByStatus('toReturn').map(r => (
						<RequestItem
							key={r.id}
							request={r}
							deliver={() => this.props.store.deliver(r.id)}
							complete={() => this.props.store.complete(r.id)}
						/>
					))}
				</Paper>

				<Typography type="subheading" className={this.props.classes.headline}>
					Vyskladněné palety
				</Typography>

				<List dense>
					{this.props.store.getRequestsByStatus('delivered').map(r => (
						<ListItem disableGutters>
							<ListItemText
								primary={r.pallet.getName() + ': ' + r.location + ' (' + r.requester + ')'}
							/>
						</ListItem>
					))}
				</List>
			</div>
		)
	}
}

export default decorate(RequestList)