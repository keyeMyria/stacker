import * as React from 'react'
import { observer } from 'mobx-react'

import Button from 'material-ui/Button'
import { withStyles, WithStyles } from 'material-ui/styles'

import { Pallet } from '../../stores/PalletStore'

interface Props {
	pallet: Pallet
}

type ClassKeys = 'root'

const decorate = withStyles<ClassKeys>(() => ({
	root: {
		margin: 4,
		width: 64,
		minWidth: 0,
		height: 64
	}
}))

@observer
class Storage extends React.Component<Props & WithStyles<ClassKeys>> {
	render() {
		return(
			<Button
				className={this.props.classes.root}
				color={this.props.pallet.isEmpty ? "accent" : "default"}
				onClick={() => this.props.pallet.toggleEmpty()}
				raised
			>
				{this.props.pallet.getName()}
			</Button>
		)
	}
}

export default decorate(Storage)