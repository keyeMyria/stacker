import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import RequestListCommon from '../../common/RequestList/RequestList'
import RequestItem from './RequestItem'

import Request from '../../../models/Request'
import RequestsStore from '../../../stores/RequestsStore'

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
	mapRequestItems = (r: Request) => {
		const handleDeliver = () => this.props.store.deliver(r.id)
		const handleComplete = () => this.props.store.deliver(r.id)

		return (
			<RequestItem
				key={r.id}
				request={r}
				deliver={handleDeliver}
				complete={handleComplete}
			/>
		)
	}

	render() {
		return(
			<div className={this.props.classes.root}>
				<RequestListCommon
					header="Zažádané palety"
					requests={this.props.store}
					type="requested"
					withPaper
					disableUnderline
					mapListItemFunction={this.mapRequestItems}
					className={this.props.classes.requestList}
				/>

				<RequestListCommon
					header="Palety k vrácení"
					requests={this.props.store}
					type="toReturn"
					withPaper
					disableUnderline
					mapListItemFunction={this.mapRequestItems}
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
