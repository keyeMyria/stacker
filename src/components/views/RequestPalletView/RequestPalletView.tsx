import * as React from 'react'
import { observer } from 'mobx-react'

import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles, StyleRules } from 'material-ui/styles'

import PalletSelectStore from '../../../stores/PalletSelectStore'

import PalletInput from './PalletInput'
import PalletSelect from './PalletSelect'

interface Props {
	store: PalletSelectStore
}

interface ClassNames {
	root: string,
	inputs: string,
	button: string
}

const styles: StyleRules = {
	root: {
		display: 'flex',
		marginTop: 300
	},
	inputs: {
		width: 400
	},
	button: {
		width: 48,
		height: 48,
		marginLeft: 16
	}
}

@observer
class RequestPalletView extends React.Component<Props & { classes: ClassNames }> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<div className={this.props.classes.inputs}>
					<PalletInput
						store={this.props.store}
					/>

					<PalletSelect
						store={this.props.store}
					/>
				</div>

				<Button
					fab
					color="primary"
					aria-label="add"
					className={this.props.classes.button}
					disabled={this.props.store.noPalletSelected()}
				>
					<AddIcon />
				</Button>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestPalletView)