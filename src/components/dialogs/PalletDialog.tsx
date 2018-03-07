import { observer } from 'mobx-react'
import * as React from 'react'

import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { CircularProgress } from 'material-ui/Progress'
import TextField from 'material-ui/TextField'

import { withStyles, WithStyles } from 'material-ui/styles'

import PalletDialogStore from '../../stores/PalletDialogStore'
import ErrorSnackbar from '../common/ErrorSnackbar'
import ExpandSection from '../common/ExpandSection'
import Field from '../common/Field'
import Minimap from '../common/Minimap'

interface Props {
	open: boolean,
	handleClose: () => void,
	store: PalletDialogStore
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
	handleDialogEnter = () => this.props.store.fetchPallet(this.props.store.palletId)
	handleEmptyPallet = () => this.props.store.toggleEmpty()
	handleSaveContent = () => this.props.store.savePalletContent()

	handleChangePalletContent = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.store.changePalletContent(event.target.value)
	}

	mapErrorHandler = (instance: ErrorSnackbar) => {
		if (instance) {
			this.props.store.errorHandler = instance
		}
	}

	render() {
		const { store } = this.props

		let dialogContent = <CircularProgress />
		if (!this.props.store.fetchingPallet) {
			dialogContent = (
				<>
					<DialogTitle>{store.pallet.name}</DialogTitle>

					<DialogContent>
						<Field
							title="Stav"
							content={store.pallet.isEmpty ? 'Prázdná' : 'Zaplněná'}
							className={this.props.classes.positionItem}
						/>

						<div className={this.props.classes.position}>
							<Field
								title="Strana"
								content={store.pallet.getSideName()}
								className={this.props.classes.positionItem}
							/>
							<Field
								title="Sloupec"
								content={store.pallet.column.toString()}
								className={this.props.classes.positionItem}
							/>
							<Field
								title="Řada"
								content={store.pallet.getRowChar()}
								className={this.props.classes.positionItem}
							/>
						</div>

						<div className={this.props.classes.contentBlock}>
							<TextField
								label="Obsah"
								placeholder="Nespecifikován"
								value={store.palletContent}
								onChange={this.handleChangePalletContent}
								multiline
								fullWidth
								className={this.props.classes.contentField}
								InputLabelProps={{ shrink: true }}
							/>

							<Button
								className={this.props.classes.saveButton}
								disabled={store.pristinePalletContent}
								onClick={this.handleSaveContent}
							>
								Save
							</Button>
						</div>

						<Minimap
							scale={5}
							side={store.pallet.side}
							x={store.pallet.column}
							y={store.pallet.row}
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
							{store.isEmpty ? 'Fill' : 'Empty'}
						</Button>

						<Button onClick={this.props.handleClose}>
							Close
						</Button>
					</DialogActions>
				</>
			)
		}

		return (
			<Dialog
				open={this.props.open}
				onEnter={this.handleDialogEnter}
				onClose={this.props.handleClose}
			>
				{dialogContent}
				<ErrorSnackbar ref={this.mapErrorHandler} />
			</Dialog>
		)
	}
}

export default decorate(PalletDialog)
