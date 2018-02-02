import * as React from 'react'
import { observer } from 'mobx-react'

import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'

import { grey } from 'material-ui/colors'
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
		color: grey[700]
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
					{this.props.requests.requests
					.filter(r => r.status === 'requested' || r.status === 'delivered')
					.sort((a, b) => {
						if(a.status === b.status) return 0
						else if(a.status === 'requested') return -1
						else return 1
					})
					.map(r => (
						<RequestItem
							key={r.id}
							request={r}
							handleCancel={() => this.props.requests.cancel(r.id)}
							handleReturn={() => this.props.requests.return(r.id)}
						/>
					))}
				</List>
			</div>
		)
	}
}

export default decorate(ActiveRequests)