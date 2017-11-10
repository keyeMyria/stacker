import * as React from 'react'
import { observer } from 'mobx-react'
import * as moment from 'moment'

import Typography from 'material-ui/Typography'
import { withStyles, WithStyles } from 'material-ui/styles'
import { grey } from 'material-ui/colors'

interface Props {
	title: string,
	time: Date
}

type ClassKeys = 'root' | 'title' | 'time'

const decorate = withStyles<ClassKeys>(() => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 16
	},
	time: {
		marginRight: 16,
		fontSize: 10,
		color: grey[500]
	}
}))

@observer
class RequestItemTitle extends React.Component<Props & WithStyles<ClassKeys>> {
	render() {
		return(
			<div className={this.props.classes.root}>
				<Typography className={this.props.classes.title}>
					{this.props.title}
				</Typography>

				<Typography className={this.props.classes.time}>
					{moment(this.props.time).locale('cs').fromNow()}
				</Typography>
			</div>
		)
	}
}

export default decorate(RequestItemTitle)