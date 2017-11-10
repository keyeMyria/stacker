import * as React from 'react'
import { observer } from 'mobx-react'

import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import Tooltip from 'material-ui/Tooltip'
import { withStyles, WithStyles } from 'material-ui/styles'
import { darken } from 'material-ui/styles/colorManipulator'
import { red, orange, green, teal } from 'material-ui/colors'

import PalletSelectStore from '../../../stores/PalletSelectStore'
import { Priority } from '../../../stores/PalletStore'

import capitalize from '../../../helpers/capitalize'

interface Props {
	store: PalletSelectStore
}

type ClassKeys = (
	'button'
	| 'priorityUrgent'
	| 'priorityHigh'
	| 'priorityStandard'
	| 'priorityLow'
	| string
)

interface State {
	anchorEl: HTMLElement | undefined,
	open: boolean
}

const decorate = withStyles<ClassKeys>(() => ({
	button: {
		width: 24,
		height: 48,
		borderTopLeftRadius: 2,
		borderBottomLeftRadius: 2,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		boxShadow: 'none'
	}, 
	priorityUrgent: {
		backgroundColor: red['A200'],
		'&:hover': {
			backgroundColor: darken(red['A200'], 0.12)
		}
	},
	priorityHigh: {
		backgroundColor: orange['A200'],
		'&:hover': {
			backgroundColor: darken(orange['A200'], 0.12)
		}
	},
	priorityStandard: {
		backgroundColor: green['A200'],
		'&:hover': {
			backgroundColor: darken(green['A200'], 0.12)
		}
	},
	priorityLow: {
		backgroundColor: teal['A200'],
		'&:hover': {
			backgroundColor: darken(teal['A200'], 0.12)
		}
	}
}))

@observer
class PriorityButton extends React.Component<Props & WithStyles<ClassKeys>, State> {
	state: State = {
		anchorEl: undefined,
		open: false,
	}

	handleClick = (event: React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => {
		this.setState({ open: true, anchorEl: event.currentTarget });
	}
	
	handleRequestClose = (): void => {
		this.setState({ open: false })
	}
	
	selectPriority = (priority: Priority): void => {
		this.props.store.setPriority(priority)
		this.setState({ open: false })
	}

	render() {
		return(
			<div>
				<Tooltip id="tooltip-priority" title="Priorita" placement="top">
					<Button
						fab
						color="primary"
						aria-label="Priorita"
						className={[
							this.props.classes.button,
							this.props.classes['priority' + capitalize(this.props.store.priority)]
						].join(' ')}
						onClick={this.handleClick}
					>
						&zwnj;
					</Button>
				</Tooltip>

				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					open={this.state.open}
					onRequestClose={this.handleRequestClose}
				>
					<MenuItem
						onClick={() => this.selectPriority('urgent')}
						selected={this.props.store.priority === 'urgent'}
					>
						Urgentní
					</MenuItem>
					<MenuItem
						onClick={() => this.selectPriority('high')}
						selected={this.props.store.priority === 'high'}
					>
						Vysoká
					</MenuItem>
					<MenuItem
						onClick={() => this.selectPriority('standard')}
						selected={this.props.store.priority === 'standard'}
					>
						Standardní
					</MenuItem>
					<MenuItem
						onClick={() => this.selectPriority('low')}
						selected={this.props.store.priority === 'low'}
					>
						Nízká
					</MenuItem>
				</Menu>
			</div>
		)
	}
}

export default decorate(PriorityButton)