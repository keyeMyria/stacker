import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import RequestItem from './RequestItem'

import RequestsStore from '../../../stores/RequestsStore'
import RequestListCommon from '../../common/RequestList/RequestList'

interface Props {
	store: RequestsStore
}

type ClassKeys = (
	'root'
	| 'requestList'
)

const decorate = withStyles<ClassKeys>(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
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
				<RequestListCommon
					header="Zažádané palety"
					requests={this.props.store}
					type="requested"
					withPaper
					disableUnderline
					mapListItemFunction={(r => (
						<RequestItem
							key={r.id}
							request={r}
							deliver={() => this.props.store.deliver(r.id)}
							complete={() => this.props.store.complete(r.id)}
						/>
					))}
					className={this.props.classes.requestList}
				/>

				<RequestListCommon
					header="Palety k vrácení"
					requests={this.props.store}
					type="toReturn"
					withPaper
					disableUnderline
					mapListItemFunction={(r => (
						<RequestItem
							key={r.id}
							request={r}
							deliver={() => this.props.store.deliver(r.id)}
							complete={() => this.props.store.complete(r.id)}
						/>
					))}
					className={this.props.classes.requestList}
				/>

				<RequestListCommon
					header="Vyvezené palety"
					requests={this.props.store}
					type="delivered"
					className={this.props.classes.requestList}
				/>
			</div>
		)
	}
}

export default decorate(RequestList)