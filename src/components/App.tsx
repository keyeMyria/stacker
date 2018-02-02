import * as React from 'react'
import { observer } from 'mobx-react'
import {
	BrowserRouter as Router,
	Route,
	RouteProps
} from 'react-router-dom'

import { withStyles, WithStyles } from 'material-ui/styles'
import Reboot from 'material-ui/Reboot'

import AppStore from '../stores/AppStore'
import PalletSelectStore from '../stores/PalletSelectStore'
import PalletStore from '../stores/PalletStore'
import RequestsStore from '../stores/RequestsStore'

import AppFrame from './views/AppFrame/AppFrame'
import RequestsView from './views/RequestsView/RequestsView'
import RequestPalletView from './views/RequestPalletView/RequestPalletView'
import PalletMapView from './views/PalletMapView/PalletMapView'
import HistoryView from './views/HistoryView/HistoryView'

interface Props {
	store: AppStore
}

type ClassKeys = (
	'routes'
)

const decorate = withStyles<ClassKeys>(() => ({
	routes: {
		display: 'flex',
		justifyContent: 'center',
		paddingTop: 32
	}
}))

const palletStore: PalletStore = new PalletStore()
const requestsStore: RequestsStore = new RequestsStore(palletStore)
const palletSelectStore: PalletSelectStore = new PalletSelectStore(requestsStore)

@observer
class App extends React.Component<Props & WithStyles<ClassKeys>> {
	render() {		
		return(
			<Router>
				<AppFrame>
					<Reboot />
					<div className={this.props.classes.routes}>
						<Route exact path="/" render={(props: RouteProps) => (
							<RequestPalletView
								{...props}
								selectStore={palletSelectStore}
								requests={requestsStore}
								palletStore={palletStore}
							/>
						)} />
						<Route path="/requests" render={(props: RouteProps) => (
							<RequestsView
								{...props}
								store={requestsStore}
							/>
						)} />
						<Route exact path="/map"  render={(props: RouteProps) => (
							<PalletMapView {...props} pallets={palletStore} />
						)} />
						<Route exact path="/history"  render={(props: RouteProps) => (
							<HistoryView {...props} store={requestsStore} />
						)} />
					</div>
				</AppFrame>
			</Router>
		)
	}
}

export default decorate(App)