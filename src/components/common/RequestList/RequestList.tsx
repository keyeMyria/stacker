import * as React from 'react'
import * as classnames from 'classnames'

import { withStyles, WithStyles } from 'material-ui/styles'
import List from 'material-ui/List'

import RequestsStore from '../../../stores/RequestsStore'
import { RequestStatus } from '../../../stores/interfaces/PalletRequest'
import RequestListItem from './RequestListItem'

interface Props {
	requests: RequestsStore,
	type?: RequestStatus,
	completed?: boolean,
	className?: string
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {}
}))

class RequestList extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		return(
			<List
				className={classnames(this.props.className)}
			>
				{this.props.requests.requests
					.filter(r => {
						if(this.props.type !== undefined && this.props.type === r.status)
							return r
						else if(this.props.completed !== undefined && this.props.completed === r.isCompleted)
							return r
						else 
							return r
					})
					.map(r => <RequestListItem key={r.id} request={r} />)
				}
			</List>
		)
	}
}

export default decorate(RequestList)