import * as React from 'react'
import { observer } from 'mobx-react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'

import { withStyles, StyleRules } from 'material-ui/styles'
import { red } from 'material-ui/colors'

import PalletSelectStore from '../../../stores/PalletSelectStore'

import PriorityButton from './PriorityButton'

interface Props {
	store: PalletSelectStore
}

interface ClassNames {
	root: string,
	search: string,
	textInput: string,
	errorText: string
}

const styles: StyleRules = {
	root: {
		marginBottom: 16
	},
	search: {
		display: 'flex',
		height: 48,
		marginBottom: 4
	},
	textInput: {
		padding: 8,
		paddingTop: 9,
		borderBottom: 'none'
	},
	errorText: {
		height: 20,
		color: red['A400'],
		fontSize: 10
	}
}

@observer
class PalletInput extends React.Component<Props & { classes: ClassNames }> {
	handleChangeInput = (event: any): void => {
		this.props.store.setInput(event.target.value)
	}

	render() {
		return(
			<div className={this.props.classes.root}>
				<Paper className={this.props.classes.search}>
					<PriorityButton
						store={this.props.store}
					/>

					<TextField
						placeholder="Paleta"
						autoFocus
						fullWidth
						value={this.props.store.input}
						onChange={this.handleChangeInput}
						className={this.props.classes.textInput}
						InputProps={{ disableUnderline: true }}
					/>
				</Paper>
			
				<Typography className={this.props.classes.errorText}>
					{this.props.store.inputError}
				</Typography>
			</div>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(PalletInput)