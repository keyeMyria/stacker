import * as React from 'react'
import { observer } from 'mobx-react'

import AppStore from '../stores/AppStore'
import PalletStore from '../stores/PalletStore'

import PalletMap from './PalletMap/PalletMap'

const store = new PalletStore()

interface Props {
	store: AppStore
}

@observer
export default class App extends React.Component<Props, {}> {
	render() {
		return(
			<PalletMap store={store} />
		)
	}
}