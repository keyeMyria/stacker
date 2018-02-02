import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog'
import Button from 'material-ui/Button'

import Pallet from '../../stores/common/Pallet'
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
	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.handleClose}
			>
				<DialogTitle>{this.props.pallet.getName()}</DialogTitle>

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
							content={this.props.pallet.row}
							className={this.props.classes.positionItem}
						/>
					</div>
					
					<Minimap
						scale={5}
						side={this.props.pallet.side}
						x={this.props.pallet.column}
						y={this.props.pallet.getRowNumber()}
					/>

					<ExpandSection
						title="Požadavky"
						className={this.props.classes.requests}
					>
					</ExpandSection>
				</DialogContent>

				<DialogActions>
					<Button color="secondary" onClick={() => this.props.pallet.toggleEmpty()}>
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