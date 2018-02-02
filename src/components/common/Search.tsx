import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'
import Input from 'material-ui/Input'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'

import SearchStore from '../../stores/SearchStore'

interface Props {
	store: SearchStore
}

type ClassNames = 'root' | 'input'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
		marginBottom: 8
	},
	input: {
		marginRight: 16
	}
}))

@observer
class Search extends React.Component<Props & WithStyles<ClassNames>> {
	handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.props.store.changeFilterText(event.target.value)
	}

	handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.props.store.changeFilterField(event.target.value)
	}
	
	render() {
		const { store, classes } = this.props

		return(
			<div className={classes.root}>
				<Input
					placeholder="Hledat"
					fullWidth
					className={classes.input}
					onChange={this.handleInputChange}
					value={store.filterText}
				/>
				<Select value={store.filterField} onChange={this.handleSelectChange}>
					<MenuItem value="name">Název palety</MenuItem>
					<MenuItem value="location">Umístění</MenuItem>
					<MenuItem value="requester">Jméno žadatele</MenuItem>
				</Select>
			</div>
		)
	}
}

export default decorate(Search)