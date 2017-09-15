import * as React from 'react'
import { observer } from 'mobx-react'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles, StyleRules } from 'material-ui/styles'
import { red } from 'material-ui/colors'

import PalletSelectStore from '../../../stores/PalletSelectStore'

interface Props {
	store: PalletSelectStore
}

interface ClassNames {
	root: string,
	inputs: string,
	search: string,
	textInput: string,
	errorText: string,
	selectInput: string,
	select: string,
	button: string
}

const styles: StyleRules = {
	root: {
		display: 'flex',
		marginTop: 200
	},
	inputs: {
		width: 400
	},
	search: {
		height: 32,
		marginBottom: 4,
		padding: 8
	},
	textInput: {
		paddingTop: 1,
		borderBottom: 'none'
	},
	errorText: {
		height: 20,
		marginBottom: 16,
		color: red['A400'],
		fontSize: 10
	},
	selectInput: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	select: {
		minWidth: 100,
		marginRight: 8,
		'&:last-child': {
			marginRight: 0
		}
	},
	button: {
		width: 48,
		height: 48,
		marginLeft: 16
	}
}

@observer
class RequestPalletView extends React.Component<Props & { classes: ClassNames }> {
	handleChangeInput = (event: any): void => {
		this.props.store.setInput(event.target.value)
	}

	handleChangeSide = (event: any): void => {
		this.props.store.setSide(event.target.value)
	}

	handleChangeColumn = (event: any): void => {
		this.props.store.setColumn(event.target.value)
	}

	handleChangeRow = (event: any): void => {
		this.props.store.setRow(event.target.value)
	}

	render() {
		return(
			<div className={this.props.classes.root}>
				<div className={this.props.classes.inputs}>
					<Paper className={this.props.classes.search}>
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

					<div className={this.props.classes.selectInput}>
						<FormControl className={this.props.classes.select}>
							<InputLabel htmlFor="side">
								Strana
							</InputLabel>
							<Select
								value={this.props.store.side}
								onChange={this.handleChangeSide}
								input={<Input id="side" />}
								MenuProps={{ MenuListProps: { dense: true }}}
							>
								<MenuItem value="left">Left</MenuItem>
								<MenuItem value="right">Right</MenuItem>
							</Select>
						</FormControl>
						
						<FormControl
							className={this.props.classes.select}
							disabled={!this.props.store.side}
						>
							<InputLabel htmlFor="column">
								Sloupec
							</InputLabel>
							<Select
								value={this.props.store.column}
								onChange={this.handleChangeColumn}
								input={<Input id="column" />}
							>	
								{this.props.store.columnNames.map(c => (
									<MenuItem key={c} value={c}>{c}</MenuItem>
								))}
							</Select>
						</FormControl>
						
						<FormControl
							className={this.props.classes.select}
							disabled={!this.props.store.side || !this.props.store.column}
						>
							<InputLabel htmlFor="row">
								Řada
							</InputLabel>
							<Select
								value={this.props.store.row}
								onChange={this.handleChangeRow}
								input={<Input id="row" />}
							>
								{this.props.store.rowNames.map(r => (
									<MenuItem key={r} value={r}>{r}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
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