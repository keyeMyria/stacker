import * as React from 'react'
import { observer } from 'mobx-react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import Input from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Typography from 'material-ui/Typography'

import { withStyles, WithStyles } from 'material-ui/styles'
import { red, grey } from 'material-ui/colors'

import PalletSelectStore from '../../../stores/PalletSelectStore'

import PriorityButton from './PriorityButton'

interface Props {
	store: PalletSelectStore
}

type ClassKeys = (
	'root'
	|'search'
	|'textInput'
	|'palletInput'
	|'locationInput'
	|'selectPlaceholder'
	|'errorText'
)

const decorate = withStyles<ClassKeys>(() => ({
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
	palletInput: {
		width: 90
	},
	locationInput: {
		width: 265,
		borderLeft: '1px solid',
		borderLeftColor: grey[200]
	},
	selectPlaceholder: {
		position: 'absolute',
		marginTop: 5,
		fontSize: 16,
		color: '#A1A1A1'
	},
	errorText: {
		height: 20,
		color: red['A400'],
		fontSize: 10
	}
}))

@observer
class PalletInput extends React.Component<Props & WithStyles<ClassKeys>> {
	handleChangeInputPallet = (event: any): void => {
		this.props.store.setInput(event.target.value)
	}

	handleChangeInputLocation = (event: any): void => {
		this.props.store.setLocation(event.target.value)
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
						value={this.props.store.input}
						onChange={this.handleChangeInputPallet}
						className={[
							this.props.classes.textInput,
							this.props.classes.palletInput
						].join(' ')}
						InputProps={{ disableUnderline: true }}
					/>

					<div
						className={[
							this.props.classes.textInput,
							this.props.classes.locationInput
						].join(' ')}
					>
						{!this.props.store.location &&
							<Typography className={this.props.classes.selectPlaceholder}>
								Umístění
							</Typography>
						}

						<Select
							value={this.props.store.location}
							onChange={this.handleChangeInputLocation}
							input={
								<Input
									disableUnderline
									fullWidth
								/>
							}
						>
							<MenuItem value="prijem">Příjem</MenuItem>
							<MenuItem value="sklad">Hutní sklad</MenuItem>
							<MenuItem value="expedice">Expedice</MenuItem>
							<MenuItem value="haslerPrvniPatro">Hasler 1. patro</MenuItem>
							<MenuItem value="haslerSklad">Hasler sklad</MenuItem>
						</Select>
					</div>
				</Paper>
			
				<Typography className={this.props.classes.errorText}>
					{this.props.store.inputError}
				</Typography>
			</div>
		)
	}
}

export default decorate(PalletInput)