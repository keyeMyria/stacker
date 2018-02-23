import * as classnames from 'classnames'
import { observer } from 'mobx-react'
import * as React from 'react'

import Button from 'material-ui/Button'
import { green, orange, red, teal } from 'material-ui/colors'
import Menu, { MenuItem } from 'material-ui/Menu'
import { withStyles, WithStyles } from 'material-ui/styles'
import { darken } from 'material-ui/styles/colorManipulator'
import Tooltip from 'material-ui/Tooltip'

import PalletSelectStore from '../../../stores/PalletSelectStore'
import Priority from '../../../stores/types/Priority'

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
		backgroundColor: red.A200,
		'&:hover': {
			backgroundColor: darken(red.A200, 0.12)
		}
	},
	priorityHigh: {
		backgroundColor: orange.A200,
		'&:hover': {
			backgroundColor: darken(orange.A200, 0.12)
		}
	},
	priorityStandard: {
		backgroundColor: green.A200,
		'&:hover': {
			backgroundColor: darken(green.A200, 0.12)
		}
	},
	priorityLow: {
		backgroundColor: teal.A200,
		'&:hover': {
			backgroundColor: darken(teal.A200, 0.12)
		}
	}
}))

@observer
class PriorityButton extends React.Component<Props & WithStyles<ClassKeys>, State> {
	state: State = {
		anchorEl: undefined,
		open: false
	}

	handleClick = (event: React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => {
		this.setState({ open: true, anchorEl: event.currentTarget })
	}

	handleRequestClose = (): void => {
		this.setState({ open: false })
	}

	selectPriority = (priority: Priority): void => {
		this.props.store.setPriority(priority)
		this.setState({ open: false })
	}

	handleSelectUrgentPriority = () => this.selectPriority('urgent')
	handleSelectHighPriority = () => this.selectPriority('high')
	handleSelectStandardPriority = () => this.selectPriority('standard')
	handleSelectLowPriority = () => this.selectPriority('low')

	render() {
		const priorittyButtonClasses = classnames(
			this.props.classes.button,
			this.props.classes['priority' + capitalize(this.props.store.priority)]
		)

		return(
			<div>
				<Tooltip id="tooltip-priority" title="Priorita" placement="top">
					<Button
						fab
						color="primary"
						aria-label="Priorita"
						className={priorittyButtonClasses}
						onClick={this.handleClick}
					>
						&zwnj;
					</Button>
				</Tooltip>

				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					open={this.state.open}
					onClose={this.handleRequestClose}
				>
					<MenuItem
						onClick={this.handleSelectUrgentPriority}
						selected={this.props.store.priority === 'urgent'}
					>
						Urgentní
					</MenuItem>
					<MenuItem
						onClick={this.handleSelectHighPriority}
						selected={this.props.store.priority === 'high'}
					>
						Vysoká
					</MenuItem>
					<MenuItem
						onClick={this.handleSelectStandardPriority}
						selected={this.props.store.priority === 'standard'}
					>
						Standardní
					</MenuItem>
					<MenuItem
						onClick={this.handleSelectLowPriority}
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
