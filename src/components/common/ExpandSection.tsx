import * as classnames from 'classnames'
import * as React from 'react'

import IconButton from 'material-ui/IconButton'
import { withStyles, WithStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

interface Props {
	title: string,
	className?: string
}

interface State {
	expand: boolean
}

type ClassNames = 'toggle' | 'title' | 'expandButton'

const decorate = withStyles<ClassNames>(() => ({
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
					<Typography variant="subheading" className={this.props.classes.title}>
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
