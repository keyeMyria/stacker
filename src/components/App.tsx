import * as React from 'react'
import { observer } from 'mobx-react'
import {
	BrowserRouter as Router,
	Route,
	RouteProps
} from 'react-router-dom'

import { withStyles, StyleRules } from 'material-ui/styles'

import { grey } from 'material-ui/colors'

import AppStore from '../stores/AppStore'
import PalletSelectStore from '../stores/PalletSelectStore'
import PalletStore from '../stores/PalletStore'

import PalletMap from './PalletMap/PalletMap'
import RequestsView from './views/RequestsView/RequestsView'
import RequestPalletView from './views/RequestPalletView/RequestPalletView'

interface Props {
	store: AppStore
}

interface ClassNames {
	root: string
}

const styles: StyleRules = {
	root: {
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		paddingTop: 32,
		backgroundColor: grey[50]
	}
}

const palletSelectStore: PalletSelectStore = new PalletSelectStore()
const palletStore: PalletStore = new PalletStore()

@observer
class App extends React.Component<Props & { classes: ClassNames }> {
	render() {		
		return(
			<Router>
				<div className={this.props.classes.root}>
					<Route exact path="/"  render={(props: RouteProps) => (
						<PalletMap {...props} store={palletStore} />
					)}/>
					<Route path="/request" render={(props: RouteProps) => (
						<RequestPalletView {...props} store={palletSelectStore} />
					)}/>
					<Route path="/requests" render={(props: RouteProps) => (
						<RequestsView {...props} palletStore={palletStore} />
					)}/>
				</div>
			</Router>
		)
	}
}

export default withStyles<Props, ClassNames>(styles)(App)