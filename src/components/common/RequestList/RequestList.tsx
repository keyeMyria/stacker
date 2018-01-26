import * as React from 'react'
import { observer } from 'mobx-react'
import * as classnames from 'classnames'

import { withStyles, WithStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import { common } from 'material-ui/colors'

import RequestsStore from '../../../stores/RequestsStore'
import PalletRequest, { RequestStatus } from '../../../stores/interfaces/PalletRequest'
import RequestListItem from './RequestListItem'
import RequestListItemSummary from './RequestListItemSummary'

interface Props {
	requests: RequestsStore,
	header?: string,
	type?: RequestStatus,
	completed?: boolean,
	withPaper?: boolean,
	summaryItem?: boolean,
	className?: string,
	mapListItemFunction?: (r: PalletRequest) => JSX.Element
}

type ClassNames = 'root' | 'header'

const decorate = withStyles<ClassNames>(() => ({
	root: {
	},
	header: {
		color: common['lightBlack'],
		marginBottom: 8
	}
}))

@observer
class RequestList extends React.Component<Props & WithStyles<ClassNames>> {
	mapListItem = (r: PalletRequest): JSX.Element => {
		if(this.props.summaryItem === true) {
			return <RequestListItemSummary key={r.id} request={r} />
		} else {
			return <RequestListItem key={r.id} request={r} />
		}
	}

	getMapListItemFunction = (r: PalletRequest) => {
		if(this.props.mapListItemFunction) {
			return this.props.mapListItemFunction(r)
		} else {
			return this.mapListItem(r)
		}
	}

	getRequests = () => {
		return this.props.requests.requests
			.filter(r => {
				if(this.props.type === undefined)
					return r
				else if(this.props.type === r.status)
					return r
			})
			.filter(r => {
				if(this.props.completed === undefined)
					return r
				else if(this.props.completed === r.isCompleted)
					return r
			})
			.map(this.getMapListItemFunction)
	}

	render() {
		let header = null
		let requests = this.getRequests()

		if(this.props.header && requests.length > 0) {
			header = (
				<Typography type="headline" className={this.props.classes.header}>
					{this.props.header}
				</Typography>
			)
		}

		let content = (
			<List disablePadding>
				{requests}
			</List>
		)

		if(this.props.withPaper) {
			content = (
				<Paper>
					{content}
				</Paper>
			)
		}

		return(
			<div className={
				classnames(this.props.className, this.props.classes.root)
			}>
				{header}

				{content}
			</div>
		)
	}
}

export default decorate(RequestList)