import * as classnames from 'classnames'
import * as React from 'react'

import { withStyles, WithStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

interface Props {
	title: string,
	content?: string,
	children?: JSX.Element,
	className?: string
}

type ClassNames = 'root'

const decorate = withStyles<ClassNames>(theme => ({
	root: {
		marginBottom: 8,
		'&:last-child': {
			marginBottom: 0
		}
	}
}))

class Field extends React.Component<Props & WithStyles<ClassNames>> {
	render() {
		if (
			(this.props.content === undefined || this.props.content === null) &&
			!this.props.children
		) {
			return null
		}

		const rootClasses = classnames(
			this.props.classes.root,
			this.props.className
		)

		const contentEl = (
			<Typography>
				{this.props.content}
			</Typography>
		)

		return(
			<div className={rootClasses}>
				<Typography variant="caption">
					{this.props.title}
				</Typography>

				{this.props.content && contentEl}

				{this.props.children}
			</div>
		)
	}
}

export default decorate(Field)
