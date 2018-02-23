import { observer } from 'mobx-react'
import * as React from 'react'

import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { withStyles, WithStyles } from 'material-ui/styles'

import Pallet from '../../models/Pallet'
import ExpandSection from '../common/ExpandSection'
import Field from '../common/Field'
import Minimap from '../common/Minimap'

interface Props {
	open: boolean,
	handleClose: () => void
	pallet: Pallet
}

type ClassNames = 'position' | 'positionItem' | 'requests'

const decorate = withStyles<ClassNames>(() => ({
	position: {
		display: 'flex',
		marginBottom: 16
	},
	positionItem: {
		marginRight: 32,
		'&:last-child': {
			marginRight: 0
		}
	},
	requests: {
		marginTop: 16
	}
}))

@observer
class PalletDialog extends React.Component<Props & WithStyles<ClassNames>> {
	handleToggleEmpty = () => this.props.pallet.toggleEmpty()

	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.handleClose}
			>
				<DialogTitle>{this.props.pallet.name}</DialogTitle>

				<DialogContent>
					<Field
						title="Stav"
						content={this.props.pallet.isEmpty ? 'Prázdná' : 'Zaplněná'}
						className={this.props.classes.positionItem}
					/>

					<div className={this.props.classes.position}>
						<Field
							title="Strana"
							content={this.props.pallet.getSideName()}
							className={this.props.classes.positionItem}
						/>
						<Field
							title="Sloupec"
							content={this.props.pallet.column.toString()}
							className={this.props.classes.positionItem}
						/>
						<Field
							title="Řada"
							content={this.props.pallet.getRowChar()}
							className={this.props.classes.positionItem}
						/>
					</div>

					<Minimap
						scale={5}
						side={this.props.pallet.side}
						x={this.props.pallet.column}
						y={this.props.pallet.row}
					/>

					<ExpandSection
						title="Požadavky"
						className={this.props.classes.requests}
					>
						Empty
					</ExpandSection>
				</DialogContent>

				<DialogActions>
					<Button color="secondary" onClick={this.handleToggleEmpty}>
						{this.props.pallet.isEmpty ? 'Fill' : 'Empty'}
					</Button>

					<Button onClick={this.props.handleClose}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default decorate(PalletDialog)
