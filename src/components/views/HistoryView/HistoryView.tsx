import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import RequestsStore from '../../../stores/RequestsStore'
import RequestList from '../../common/RequestList/RequestList'

interface Props {
	store: RequestsStore
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex'
	}
}))

@observer
class HistoryView extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		return(
			<RequestList withPaper summaryItem requests={this.props.store} />
		)
	}
}

export default decorate(HistoryView)