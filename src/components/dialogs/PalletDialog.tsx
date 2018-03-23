import { observer } from 'mobx-react'
import * as React from 'react'

import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import Menu, { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'

import { withStyles, WithStyles } from 'material-ui/styles'

import Pallet, { fetchPalletTypes } from '../../models/Pallet'
import PalletType from '../../models/PalletType'
import ErrorSnackbar from '../common/ErrorSnackbar'
import ExpandSection from '../common/ExpandSection'
import Field from '../common/Field'
import Minimap from '../common/Minimap'
import RequestList from './RequestList'

interface Props {
	open: boolean,
	handleClose: () => void,
	pallet: Pallet
}

interface State {
	typeMenu: HTMLElement | undefined,
	types: PalletType[]
}

type ClassNames = (
	'root' |
	'position' |
	'positionItem' |
	'contentBlock' |
	'contentField' |
	'typesContent' |
	'typesChips' |
	'typesChip' |
	'requests' |
	'saveButton'
)

const decorate = withStyles<ClassNames>(() => ({
	root: {
		width: 500
	},
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
	typesContent: {
		marginTop: 4
	},
	typesChips: {
	},
	typesChip: {
		marginRight: 8,
		marginBottom: 4
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
class PalletDialog extends React.Component<Props & WithStyles<ClassNames>, State> {
	state = {
		typeMenu: undefined,
		types: []
	}

	async componentDidMount() {
		this.setState({ types: await fetchPalletTypes() })
	}

	handleEmptyPallet = () => this.props.pallet.toggleEmpty()
	handleSaveContent = () => this.props.pallet.savePalletContent()

	handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.pallet.changeContent(event.target.value)
	}

	handleTypeMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		this.setState({ typeMenu: event.currentTarget })
	}
	handleTypeMenuClose = () => this.setState({ typeMenu: undefined })

	mapErrorHandler = (instance: ErrorSnackbar) => {
		if (instance) {
			// this.props.store.errorHandler = instance
		}
	}

	mapTypeMenuChip = (type: PalletType) => {
		const handleDeleteType = () => this.props.pallet.deleteType(type)

		return(
			<Chip
				label={type.typeName}
				key={type.id}
				onDelete={handleDeleteType}
				className={this.props.classes.typesChip}
			/>
		)
	}

	mapTypeMenuItem = (type: PalletType) => {
		const handleAddType = () => this.props.pallet.addType(type)

		return(
			<MenuItem
				key={type.id}
				onClick={handleAddType}
				dense
			>
				{type.typeName}
			</MenuItem>
		)
	}

	render() {
		const { pallet } = this.props

		const typesChips = (
			<div className={this.props.classes.typesChips}>
				{pallet.types.map(this.mapTypeMenuChip)}
			</div>
		)

		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.handleClose}
				PaperProps={{ className: this.props.classes.root}}
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
							Uložit
						</Button>
					</div>

					<div className={this.props.classes.contentField}>
						<Field
							title="Typy"
						>
							<div className={this.props.classes.typesContent}>
								{pallet.types && pallet.types.length > 0 && typesChips}

								<Button
									onClick={this.handleTypeMenuClick}
								>
									Přidat typ
								</Button>
								<Menu
									anchorEl={this.state.typeMenu}
									open={Boolean(this.state.typeMenu)}
									onClose={this.handleTypeMenuClose}
								>
									{this.state.types.map(this.mapTypeMenuItem)}
								</Menu>
							</div>
						</Field>
					</div>

					<Minimap
						scale={5}
						side={pallet.side}
						x={pallet.column}
						y={pallet.row}
					/>

					<ExpandSection
						title="Poslední Požadavky"
						className={this.props.classes.requests}
					>
						<RequestList requests={pallet.requests} />
					</ExpandSection>
				</DialogContent>

				<DialogActions>
					<Button color="secondary" onClick={this.handleEmptyPallet}>
						{pallet.isEmpty ? 'Zaplnit' : 'Vyprázdnit'}
					</Button>

					<Button onClick={this.props.handleClose}>
						Zavřít
					</Button>
				</DialogActions>
				<ErrorSnackbar ref={this.mapErrorHandler} />
			</Dialog>
		)
	}
}

export default decorate(PalletDialog)
