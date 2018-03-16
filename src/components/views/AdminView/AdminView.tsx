import { observer } from 'mobx-react'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'

import AppStore from '../../../stores/AppStore'
import RoleSelectStore from '../../../stores/RoleSelectStore'

import NoPermissionView from '../../common/NoPermissionView'
import RoleSelect from './RoleSelect'

interface Props {
	store: AppStore,
	canShow: boolean
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}))

const roleSelectStore = new RoleSelectStore()

@observer
class AdminView extends React.Component<Props & WithStyles<ClassNames>> {
	handleInitialize = () => this.props.store.initializePallets()

	render() {
		if (!this.props.canShow) { return <NoPermissionView /> }

		return(
			<div className={this.props.classes.root}>
				<RoleSelect store={roleSelectStore} />
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
