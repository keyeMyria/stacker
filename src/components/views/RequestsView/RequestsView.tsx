import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import RequestList from './RequestList'

import RequestsStore from '../../../stores/RequestsStore'

interface Props {
	store: RequestsStore
}

type ClassKeys = (
	'root'
)

const decorate = withStyles<ClassKeys>(() => ({
	root: {
		display: 'flex'
	}
}))

@observer
class RequestsView extends React.Component<Props & WithStyles<ClassKeys>> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<RequestList store={this.props.store} />
			</div>
		)
	}
}

export default decorate(RequestsView)
