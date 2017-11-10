import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'

import { common } from 'material-ui/colors'
import { withStyles, WithStyles } from 'material-ui/styles'

import PalletSelectStore from '../../../stores/PalletSelectStore'

import RequestItem from './RequestItem'

interface Props {
	store: PalletSelectStore
	className: string
}

type ClassNames = 'root' | 'title'

const decorate = withStyles<ClassNames>(() => ({
	root: {
	},
	title: {
		color: common['lightBlack']
	}
}))

@observer
class ActiveRequests extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		return(
			<div
				className={[
					this.props.className,
					this.props.classes.root
				].join(' ')}
			>
				<Typography type="headline" className={this.props.classes.title}>
					Aktivní položky
				</Typography>

				<Divider />

				<List>
					<RequestItem />
					<RequestItem />
					<RequestItem />
				</List>
			</div>
		)
	}
}

export default decorate(ActiveRequests)