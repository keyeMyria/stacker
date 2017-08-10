import * as React from 'react'
import { observer } from 'mobx-react'

import AppStore from '../stores/AppStore'

import PalletMap from './PalletMap/PalletMap'

interface Props {
	store: AppStore
}

@observer
export default class App extends React.Component<Props, {}> {
	render() {
		return(
			<PalletMap />
		)
	}
}