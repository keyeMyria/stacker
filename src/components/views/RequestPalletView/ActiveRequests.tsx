import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'

import { common } from 'material-ui/colors'
import { withStyles, WithStyles } from 'material-ui/styles'

import RequestsStore from '../../../stores/RequestsStore'
import PalletStore from '../../../stores/PalletStore'

import RequestItem from './RequestItem'

interface Props {
	requests: RequestsStore,
	pallets: PalletStore,
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
		if(this.props.requests.requests.length === 0) 
			return null
			
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
					{this.props.requests.requests.map(r => (
						<RequestItem
							key={r.id}
							request={r}
							handleCancel={() => this.props.requests.cancelRequest(r.id)}
						/>
					))}
				</List>
			</div>
		)
	}
}

export default decorate(ActiveRequests)