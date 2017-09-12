import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, StyleRules } from 'material-ui/styles'

import RequestList from './RequestList'

import PalletStore from '../../../stores/PalletStore'

interface Props {
	palletStore: PalletStore
}

interface ClassNames {
	root: string
}

const styles: StyleRules = {
	root: {
		display: 'flex'
	}
}

@observer
class RequestsView extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<RequestList requests={this.props.palletStore.requests} />
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestsView)