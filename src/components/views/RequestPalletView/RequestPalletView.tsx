import * as React from 'react'
import { observer } from 'mobx-react'

import TextField from 'material-ui/TextField'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import { withStyles, StyleRules } from 'material-ui/styles'

import PalletSelectStore from '../../../stores/PalletSelectStore'

interface Props {
	store: PalletSelectStore
}

interface ClassNames {
	root: string,
	textInput: string,
	selectInput: string,
	select: string
}

const styles: StyleRules = {
	root: {
		width: 400,
		margin: 'auto'
	},
	textInput: {
		marginBottom: 16
	},
	selectInput: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	select: {
		minWidth: 120,
		marginRight: 8,
		'&:last-child': {
			marginRight: 0
		}
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
				<div className={this.props.classes.textInput}>
					<TextField
						label="Paleta"
						autoFocus
						fullWidth
						value={this.props.store.input}
						onChange={this.handleChangeInput}
					/>
				</div>

				<div className={this.props.classes.selectInput}>
					<FormControl className={this.props.classes.select}>
						<InputLabel htmlFor="side">
							Strana
						</InputLabel>
						<Select
							value={this.props.store.side}
							onChange={this.handleChangeSide}
							input={<Input id="side" />}
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
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(RequestPalletView)