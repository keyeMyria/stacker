import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import RequestsStore from '../../../stores/RequestsStore'
import SearchStore from '../../../stores/SearchStore'
import RequestList from '../../common/RequestList/RequestList'
import Search from '../../common/Search'

const searchStore = new SearchStore()

interface Props {
	store: RequestsStore
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: 600
	}
}))

@observer
class HistoryView extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<Search store={searchStore} />
				<RequestList
					withPaper
					itemType="summary"
					requests={this.props.store}
					filter={searchStore.filter}
				/>
			</div>
		)
	}
}

export default decorate(HistoryView)
