import * as React from 'react'
import { observer } from 'mobx-react'

import { withStyles, WithStyles } from 'material-ui/styles'

import TextField from 'material-ui/TextField'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import { FormControl, FormHelperText } from 'material-ui/Form'
import { CircularProgress } from 'material-ui/Progress'

import AppStore from '../../../stores/AppStore'

interface Props {
	store: AppStore
}

interface State {
	username: string,
	password: string
}

type ClassNames = 'root' | 'content' | 'form' | 'formField'

const decorate = withStyles<ClassNames>(() => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		width: 300
	},
	form: {
		display: 'flex',
		flexDirection: 'column'
	},
	formField: {
		marginBottom: 16
	}
}))

@observer
class LoginView extends React.Component<Props & WithStyles<ClassNames>, State> {
	state: State = {
		username: '',
		password: ''
	}

	handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ username: event.target.value })
	}

	handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ password: event.target.value })
	}

	handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if(event.key === 'Enter') {
			this.handleLogin()
		}
	}

	handleLogin = (): void => {
		this.props.store.login(this.state.username,this.state.password)
	}

	render() {
		if(this.props.store.isAuthenticated === undefined) {
			return(
				<div className={this.props.classes.root}>
					<CircularProgress size={128} />
				</div>
			)
		}

		return(
			<div className={this.props.classes.root}>
				<Card className={this.props.classes.content}>
					<CardContent className={this.props.classes.form}>
						<TextField
							label="Uživatelské jméno"
							value={this.state.username}
							onChange={this.handleChangeUsername}
							onKeyPress={this.handleEnterPress}
							className={this.props.classes.formField}
							error={this.props.store.hasAuthError}
							autoFocus
						/>

						<TextField
							label="Heslo"
							type="password"
							value={this.state.password}
							onChange={this.handleChangePassword}
							onKeyPress={this.handleEnterPress}
							className={this.props.classes.formField}
							error={this.props.store.hasAuthError}
						/>

						{this.props.store.hasAuthError &&
							<FormControl error className={this.props.classes.formField}>
								<FormHelperText>
									{this.props.store.authError}
								</FormHelperText>
							</FormControl>
						}

						<FormControl>
							<FormHelperText>
								Použijte stejné údaje jako při přihlášení do systému Windows
							</FormHelperText>
						</FormControl>

					</CardContent>

					<CardActions>
						<Button
							onClick={this.handleLogin}
							fullWidth
						>
							Přihlásit
						</Button>
					</CardActions>
				</Card>
			</div>
		)
	}
}

export default decorate(LoginView)