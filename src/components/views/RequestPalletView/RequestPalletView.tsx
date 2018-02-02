import * as React from 'react'
import { observer } from 'mobx-react'

import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { withStyles, WithStyles } from 'material-ui/styles'
import BlockIcon from 'material-ui-icons/Block'
import ForwardIcon from 'material-ui-icons/Forward'

import PalletSelectStore from '../../../stores/PalletSelectStore'
import RequestsStore from '../../../stores/RequestsStore'
import PalletStore from '../../../stores/PalletStore'
import PalletRequest from '../../../stores/interfaces/PalletRequest'

import PalletInput from './PalletInput'
import PalletSelect from './PalletSelect'
import ErrorSnackbar from '../../common/ErrorSnackbar'
import RequestList from '../../common/RequestList/RequestList'
import RequestListItemUser from '../../common/RequestList/RequestListItemUser'

interface Props {
	selectStore: PalletSelectStore,
	requests: RequestsStore,
	palletStore: PalletStore
}

type ClassKeys = (
	'root'
	| 'request'
	| 'inputs'
	| 'button'
	| 'requests'
)

const decorate = withStyles<ClassKeys>(() => ({
	root: {
		marginTop: 100
	},
	request: {
		display: 'flex',
		marginBottom: 64
	},
	inputs: {
		width: 400
	},
	button: {
		width: 48,
		height: 48,
		marginLeft: 16
	},
	requests: {
		marginBottom: 16
	}
}))

@observer
class RequestPalletView extends React.Component<Props & WithStyles<ClassKeys>> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<div className={this.props.classes.request}>
					<div className={this.props.classes.inputs}>
						<PalletInput
							store={this.props.selectStore}
						/>

						<PalletSelect
							store={this.props.selectStore}
						/>
					</div>

					<Button
						fab
						color="primary"
						aria-label="add"
						className={this.props.classes.button}
						disabled={this.props.selectStore.formMissingValues()}
						onClick={() => this.props.selectStore.createRequest()}
					>
						<AddIcon />
					</Button>
					<ErrorSnackbar ref={instance => {
						if(instance)
							this.props.selectStore.errorHandler = instance
					}} />
				</div>

				<RequestList
					header="Zažádané palety"
					requests={this.props.requests}
					className={this.props.classes.requests}
					type="requested"
					mapListItemFunction={((r: PalletRequest) =>  (
						<RequestListItemUser
							key={r.id}
							request={r}
							actionName="Zrušit"
							actionIcon={<BlockIcon />}
							handleAction={() => this.props.requests.cancel(r.id)}
						/>
					))}
				/>

				<RequestList
					header="Převzaté palety"
					requests={this.props.requests}
					className={this.props.classes.requests}
					type="delivered"
					mapListItemFunction={((r: PalletRequest) =>  (
						<RequestListItemUser
							key={r.id}
							request={r}
							actionName="Vrátit"
							actionIcon={<ForwardIcon />}
							handleAction={() => this.props.requests.return(r.id)}
						/>
					))}
				/>
			</div>
		)
	}
}

export default decorate(RequestPalletView)