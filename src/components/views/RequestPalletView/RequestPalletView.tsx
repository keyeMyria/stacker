import { observer } from 'mobx-react'
import * as React from 'react'

import AddIcon from 'material-ui-icons/Add'
import BlockIcon from 'material-ui-icons/Block'
import ForwardIcon from 'material-ui-icons/Forward'
import Button from 'material-ui/Button'
import { withStyles, WithStyles } from 'material-ui/styles'

import Request from '../../../models/Request'
import AppStore from '../../../stores/AppStore'
import PalletSelectStore from '../../../stores/PalletSelectStore'
import RequestsStore from '../../../stores/RequestsStore'

import RequestList from '../../common/RequestList/RequestList'
import RequestListItemUser from '../../common/RequestList/RequestListItemUser'
import PalletInput from './PalletInput'
import PalletSelect from './PalletSelect'

interface Props {
	appStore: AppStore,
	selectStore: PalletSelectStore,
	requests: RequestsStore
}

type ClassKeys = (
	'root'
	| 'request'
	| 'mainSelect'
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
		flexDirection: 'column',
		marginBottom: 64
	},
	mainSelect: {
		display: 'flex'
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

interface ItemProps { store: RequestsStore, request: Request }
const ListRequestedItem: React.SFC<ItemProps> = (props: ItemProps) => {
	const handleCancelRequest = () => props.store.cancel(props.request.id)

	return(
		<RequestListItemUser
			request={props.request}
			actionName="Zrušit"
			actionIcon={<BlockIcon />}
			handleAction={handleCancelRequest}
		/>
	)
}

const ListToDeliverItem: React.SFC<ItemProps> = (props: ItemProps) => {
	const handleReturnRequest = () => props.store.return(props.request.id)

	return(
		<RequestListItemUser
			key={props.request.id}
			request={props.request}
			actionName="Vrátit"
			actionIcon={<ForwardIcon />}
			handleAction={handleReturnRequest}
		/>
	)
}

@observer
class RequestPalletView extends React.Component<Props & WithStyles<ClassKeys>> {
	mapRequestedPallets = ((r: Request) => (
		<ListRequestedItem store={this.props.requests} request={r} key={r.id} />
	))

	mapToReturnPallets = ((r: Request) =>  (
		<ListToDeliverItem store={this.props.requests} request={r} key={r.id} />
	))

	handleCreateRequest = () => this.props.selectStore.createRequest()

	render() {
		return(
			<div className={this.props.classes.root}>
				<div className={this.props.classes.request}>
					<div className={this.props.classes.mainSelect}>
						<div className={this.props.classes.inputs}>
							<PalletInput
								store={this.props.selectStore}
								onSubmit={this.handleCreateRequest}
							/>
						</div>

						<Button
							variant="fab"
							color="primary"
							aria-label="add"
							className={this.props.classes.button}
							disabled={this.props.selectStore.formMissingValues()}
							onClick={this.handleCreateRequest}
						>
							<AddIcon />
						</Button>
					</div>

					<div className={this.props.classes.inputs}>
						<PalletSelect store={this.props.selectStore} />
					</div>
				</div>

				<RequestList
					header="Zažádané palety"
					requests={this.props.requests}
					className={this.props.classes.requests}
					type="requested"
					mapListItemFunction={this.mapRequestedPallets}
				/>

				<RequestList
					header="Převzaté palety"
					requests={this.props.requests}
					className={this.props.classes.requests}
					type="delivered"
					mapListItemFunction={this.mapToReturnPallets}
				/>
			</div>
		)
	}
}

export default decorate(RequestPalletView)
