import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'

import AppStore from '../../../stores/AppStore'

interface Props {
	store: AppStore
}

type ClassNames = 'root' | 'content' | 'form' | 'formField'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		width: 300
	},
	form: {
		display: 'flex',
		flexDirection: 'column'
	},
	formField: {
		marginBottom: 16
	}
}))

@observer
class AdminView extends React.Component<Props & WithStyles<ClassNames>> {
	handleInitialize = () => this.props.store.initializePallets()

	render() {
		return(
			<div className={this.props.classes.root}>
				<Button
					variant="raised"
					color="secondary"
					onClick={this.handleInitialize}
				>
					Inicializovat palety
				</Button>
			</div>
		)
	}
}

export default decorate(AdminView)
