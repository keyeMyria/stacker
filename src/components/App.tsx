import * as React from 'react'
import { observer } from 'mobx-react'

import AppStore from '../stores/AppStore'
import PalletStore from '../stores/PalletStore'

import PalletMap from './PalletMap/PalletMap'

interface Props {
	store: AppStore
}

const palletStore: PalletStore = new PalletStore()

@observer
class App extends React.Component<Props> {
	render() {		
		return(
			<PalletMap store={palletStore} />
		)
	}
}

export default App