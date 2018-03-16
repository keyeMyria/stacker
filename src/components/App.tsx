import { observer } from 'mobx-react'
import * as React from 'react'
import {
	BrowserRouter as Router,
	Route,
	RouteProps
} from 'react-router-dom'

import CssBaseline from 'material-ui/CssBaseline'
import { withStyles, WithStyles } from 'material-ui/styles'

import AppStore from '../stores/AppStore'
import PalletSelectStore from '../stores/PalletSelectStore'
import PalletStore from '../stores/PalletStore'
import RequestsStore from '../stores/RequestsStore'

import ErrorSnackbar from './common/ErrorSnackbar'
import AdminView from './views/AdminView/AdminView'
import AppFrame from './views/AppFrame/AppFrame'
import HistoryView from './views/HistoryView/HistoryView'
import LoginView from './views/LoginView/LoginView'
import PalletMapView from './views/PalletMapView/PalletMapView'
import RequestPalletView from './views/RequestPalletView/RequestPalletView'
import RequestsView from './views/RequestsView/RequestsView'

interface Props {
	store: AppStore
}

type ClassKeys = (
	'routes'
)

const decorate = withStyles<ClassKeys>(theme => ({
	routes: {
		display: 'grid',
		justifyContent: 'center',
		paddingTop: 32
	}
}))

const palletStore: PalletStore = new PalletStore()
const requestsStore: RequestsStore = new RequestsStore()
const palletSelectStore: PalletSelectStore = new PalletSelectStore(requestsStore)

@observer
class App extends React.Component<Props & WithStyles<ClassKeys>> {
	constructor(props: Props & WithStyles<ClassKeys>) {
		super(props)

		requestsStore.appStore = props.store
	}

	mapErrorHandler = (instance: ErrorSnackbar) => {
		if (instance) {
			requestsStore.errorHandler = instance
			palletSelectStore.errorHandler = instance
		}
	}

	render() {
		const { isAuthenticated, user } = this.props.store

		const requestPalletView = (props: RouteProps) => (
			<RequestPalletView
				{...props}
				appStore={this.props.store}
				selectStore={palletSelectStore}
				requests={requestsStore}
			/>
		)
		const requestsView = (props: RouteProps) => (
			<RequestsView
				{...props}
				store={requestsStore}
				canShow={user.isWorker || user.isAdmin}
			/>
		)
		const palletMapView = (props: RouteProps) => (
			<PalletMapView {...props} pallets={palletStore} />
		)
		const historyView = (props: RouteProps) => (
			<HistoryView {...props} store={requestsStore} />
		)
		const adminView = (props: RouteProps) => (
			<AdminView
				{...props}
				store={this.props.store}
				canShow={user.isAdmin}
			/>
		)

		const routes = (
			<AppFrame store={this.props.store}>
				<div className={this.props.classes.routes}>
					<Route exact path="/" render={requestPalletView} />
					<Route exact path="/requests" render={requestsView} />
					<Route exact path="/map"  render={palletMapView} />
					<Route exact path="/history"  render={historyView} />
					<Route exact path="/administration" render={adminView} />
				</div>
			</AppFrame>
		)

		const login = <LoginView store={this.props.store} />

		return(
			<Router>
				<>
					<CssBaseline />
					{isAuthenticated ? routes : login}
					<ErrorSnackbar ref={this.mapErrorHandler} />
				</>
			</Router>
		)
	}
}

export default decorate(App)
