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
		width: 1000
	}
}

@observer
class RequestsView extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<RequestList pallets={this.props.palletStore.getRequestedPallets()} />
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestsView)