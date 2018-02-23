import { observer } from 'mobx-react'
import * as React from 'react'

import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'

import { withStyles, WithStyles } from 'material-ui/styles'

import PalletSelectStore from '../../../stores/PalletSelectStore'

interface Props {
	store: PalletSelectStore
}

type ClassKeys = 'root' | 'select'

const decorate = withStyles<ClassKeys>(() => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	select: {
		minWidth: 100,
		marginRight: 8,
		'&:last-child': {
			marginRight: 0
		}
	}
}))

@observer
class PalletSelect extends React.Component<Props & WithStyles<ClassKeys>> {
	handleChangeSide = (event: any): void => {
		this.props.store.setSide(event.target.value)
	}

	handleChangeColumn = (event: any): void => {
		this.props.store.setColumn(event.target.value)
	}

	handleChangeRow = (event: any): void => {
		this.props.store.setRow(event.target.value)
	}

	mapColumnNames = this.props.store.columnNames.map(c => (
		<MenuItem key={c} value={c}>{c}</MenuItem>
	))

	mapRowNames = this.props.store.rowNames.map(r => (
		<MenuItem key={r} value={r}>{r}</MenuItem>
	))

	render() {
		return(
			<div className={this.props.classes.root}>
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
						<MenuItem value="left">Levá</MenuItem>
						<MenuItem value="right">Pravá</MenuItem>
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
						{this.mapColumnNames}
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
						{this.mapRowNames}
					</Select>
				</FormControl>
			</div>
		)
	}
}

export default decorate(PalletSelect)
