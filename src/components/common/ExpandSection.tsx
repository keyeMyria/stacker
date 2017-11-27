import * as React from 'react'
import * as classnames from 'classnames'

import { withStyles, WithStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'

import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'

interface Props {
	title: string,
	className?: string
}

interface State {
	expand: boolean
}

type ClassNames = 'root' | 'toggle' | 'title' |'expandButton'

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		marginBottom: 8,
		'&:last-child': {
			marginBottom: 0
		}
	},
	toggle: {
		display: 'flex',
		cursor: 'pointer',
		marginBottom: 8
	},
	title: {
		marginRight: 8
	},
	expandButton: {
		width: 24,
		height: 24
	}
}))

class ExpandSection extends React.Component<Props & WithStyles<ClassNames>, State> {
	state: State = {
		expand: false
	}

	handleToggleExpand = () => {
		this.setState({ expand: !this.state.expand })
	}

	render() {
		return(
			<div className={classnames(this.props.className)}>
				<div
					className={this.props.classes.toggle}
					onClick={this.handleToggleExpand}
				>
					<Typography type="subheading" className={this.props.classes.title}>
						{this.props.title}
					</Typography>

					<IconButton
						aria-label="Expand more"
						className={this.props.classes.expandButton}
					>
						{this.state.expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</IconButton>
				</div>

				{this.state.expand && this.props.children}
			</div>
		)
	}
}

export default decorate(ExpandSection)