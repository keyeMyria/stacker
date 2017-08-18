import * as React from 'react'
import { observer } from 'mobx-react'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import { PalletStorage } from '../../stores/PalletStore'

interface Props {
	storage: PalletStorage
}

interface ClassNames {
	root: string
}

const styles = {
	root: {
		margin: 4,
		width: 64,
		minWidth: 0,
		height: 64
	}
}

@observer
class Storage extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<Button
				className={this.props.classes.root}
				color={this.props.storage.isEmpty ? "accent" : "default"}
				onClick={() => this.props.storage.toggleEmpty()}
				raised
			>
				{this.props.storage.palletName}
			</Button>
		)
	}
}

export default withStyles(styles)(Storage)