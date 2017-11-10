import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import RequestList from './RequestList'

import PalletStore from '../../../stores/PalletStore'

interface Props {
	palletStore: PalletStore
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
				<RequestList requests={this.props.palletStore.requests} />
			</div>
		)
	}
}

export default decorate(RequestsView)