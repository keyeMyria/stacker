import { observer } from 'mobx-react'
import * as React from 'react'

import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { withStyles, WithStyles } from 'material-ui/styles'

import Pallet from '../../models/Pallet'
import ErrorSnackbar from '../common/ErrorSnackbar'
import ExpandSection from '../common/ExpandSection'
import Field from '../common/Field'
import Minimap from '../common/Minimap'

interface Props {
	open: boolean,
	handleClose: () => void,
	pallet: Pallet
}

type ClassNames = (
	'position' |
	'positionItem' |
	'contentBlock' |
	'contentField' |
	'requests' |
	'saveButton'
)

const decorate = withStyles<ClassNames>(() => ({
	position: {
		display: 'flex'
	},
	positionItem: {
		marginRight: 32,
		'&:last-child': {
			marginRight: 0
		}
	},
	contentBlock: {
		display: 'flex'
	},
	contentField: {
		marginBottom: 16
	},
	saveButton: {
		justifySelf: 'end',
		alignSelf: 'center',
		marginLeft: 16
	},
	requests: {
		marginTop: 16
	}
}))

@observer
class PalletDialog extends React.Component<Props & WithStyles<ClassNames>> {
	handleEmptyPallet = () => this.props.pallet.toggleEmpty()
	handleSaveContent = () => this.props.pallet.savePalletContent()

	handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.pallet.changeContent(event.target.value)
	}

	mapErrorHandler = (instance: ErrorSnackbar) => {
		if (instance) {
			// this.props.store.errorHandler = instance
		}
	}

	render() {
		const { pallet } = this.props

		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.handleClose}
			>
				<DialogTitle>{pallet.name}</DialogTitle>

				<DialogContent>
					<Field
						title="Stav"
						content={pallet.isEmpty ? 'Prázdná' : 'Zaplněná'}
						className={this.props.classes.positionItem}
					/>

					<div className={this.props.classes.position}>
						<Field
							title="Strana"
							content={pallet.getSideName()}
							className={this.props.classes.positionItem}
						/>
						<Field
							title="Sloupec"
							content={pallet.column.toString()}
							className={this.props.classes.positionItem}
						/>
						<Field
							title="Řada"
							content={pallet.getRowChar()}
							className={this.props.classes.positionItem}
						/>
					</div>

					<div className={this.props.classes.contentBlock}>
						<TextField
							label="Obsah"
							placeholder="Nespecifikován"
							value={pallet.content}
							onChange={this.handleChangeContent}
							multiline
							fullWidth
							className={this.props.classes.contentField}
							InputLabelProps={{ shrink: true }}
						/>

						<Button
							className={this.props.classes.saveButton}
							disabled={pallet.pristineContent}
							onClick={this.handleSaveContent}
						>
							Save
						</Button>
					</div>

					<Minimap
						scale={5}
						side={pallet.side}
						x={pallet.column}
						y={pallet.row}
					/>

					<ExpandSection
						title="Požadavky"
						className={this.props.classes.requests}
					>
						Empty
					</ExpandSection>
				</DialogContent>

				<DialogActions>
					<Button color="secondary" onClick={this.handleEmptyPallet}>
						{pallet.isEmpty ? 'Fill' : 'Empty'}
					</Button>

					<Button onClick={this.props.handleClose}>
						Close
					</Button>
				</DialogActions>
				<ErrorSnackbar ref={this.mapErrorHandler} />
			</Dialog>
		)
	}
}

export default decorate(PalletDialog)
