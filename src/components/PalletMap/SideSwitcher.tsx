import * as React from 'react'
import { observer } from 'mobx-react'

import Tabs, { Tab } from 'material-ui/Tabs'

import PalletStore from '../../stores/PalletStore'

interface Props {
	store: PalletStore
}

@observer
class SideSwitcher extends React.Component<Props> {
	handleChange = (event: object, value: string) => {
		this.props.store.switchSide(value)
	}

	render() {
		return(
			<Tabs
				centered
				value={this.props.store.showSide}
				onChange={this.handleChange}
			>
				<Tab label="Left side" value="left" />
				<Tab label="Right side" value="right" />
			</Tabs>
		)
	}
}

export default SideSwitcher