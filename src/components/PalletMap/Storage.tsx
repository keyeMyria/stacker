import * as React from 'react'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import { PalletStorage } from '../../stores/PalletStore'

interface Props {
	storage: PalletStorage
}

interface State {
	active: boolean,
	width: number,
	height: number
}

export default class Storage extends React.Component<Props, State> {
	state = {
		active: false,
		width: 64,
		height: 64
	}

	handleToggleActive = () => {
		if(this.state.active) {
			this.setState({
				active: !this.state.active,
				width: 64,
				height: 64
			})
		} else {
			this.setState({
				active: !this.state.active,
				width: 128,
				height: 128
			})
		}
	}

	render() {
		const style = {
			margin: 8,
			width: this.state.width,
			height: this.state.height,
			minWidth: 'unset',
			cursor: 'pointer'
		}
	
		return (
			<Button raised
				style={style}
				onClick={this.handleToggleActive}
			>
				<Typography type="body1" component="p">
					{this.props.storage.palletName}
				</Typography>
			</Button>
		)
	}
}