import * as classnames from 'classnames'
import { observer } from 'mobx-react'
import * as React from 'react'

import { grey } from 'material-ui/colors'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'
import Paper from 'material-ui/Paper'
import { withStyles, WithStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import Request from '../../../models/Request'
import { StatusName } from '../../../models/StatusChange'
import RequestsStore from '../../../stores/RequestsStore'
import RequestListItem from './RequestListItem'
import RequestListItemSummary from './RequestListItemSummary'

interface Props {
	requests: RequestsStore,
	header?: string,
	type?: StatusName,
	completed?: boolean,
	withPaper?: boolean,
	disableUnderline?: boolean,
	itemType?: 'default' | 'summary' | 'user',
	className?: string,
	mapListItemFunction?: (r: Request) => JSX.Element,
	filter?: (request: Request) => Request | undefined
}

type ClassNames = 'root' | 'header' | 'list'

const decorate = withStyles<ClassNames>(() => ({
	root: {
	},
	header: {
		color: grey[700]
	},
	list: {
		marginTop: 8
	}
}))

@observer
class RequestList extends React.Component<Props & WithStyles<ClassNames>> {
	static defaultProps: Partial<Props> = {
		itemType: 'default'
	}

	mapListItem = (r: Request): JSX.Element => {
		if (this.props.itemType === 'summary') {
			return <RequestListItemSummary key={r.id} request={r} />
		} else {
			return <RequestListItem key={r.id} request={r} />
		}
	}

	getMapListItemFunction = (r: Request) => {
		if (this.props.mapListItemFunction) {
			return this.props.mapListItemFunction(r)
		} else {
			return this.mapListItem(r)
		}
	}

	getRequests = () => {
		let requests: Request[] = this.props.requests.requests

		if (this.props.filter !== undefined) {
			requests = requests.filter(this.props.filter)
		}

		return requests
			.filter(r => {
				if (this.props.type === undefined) {
					return r
				} else if (this.props.type === r.statusName) {
					return r
				}
			})
			.map(this.getMapListItemFunction)
	}

	render() {
		const { disableUnderline } = this.props
		let header = null
		const requests = this.getRequests()

		if (this.props.header && requests.length > 0) {
			header = [
				<Typography key="header" variant="headline" className={this.props.classes.header}>
					{this.props.header}
				</Typography>,
				(disableUnderline === undefined || disableUnderline === false) ?
					<Divider key="divider" /> : null
			]
		}

		let content = (
			<List disablePadding className={this.props.classes.list}>
				{requests}
			</List>
		)

		if (this.props.withPaper) {
			content = (
				<Paper>
					{content}
				</Paper>
			)
		}

		return(
			<div className={classnames(this.props.className, this.props.classes.root)}>
				{header}

				{content}
			</div>
		)
	}
}

export default decorate(RequestList)
