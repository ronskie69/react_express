import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, isLogged, ...otherProps }) {
    return (
        <Route
            {...otherProps}
            render = {
                ({ location }) =>
                isLogged ?
                <Component/>
                :
                <Redirect to = {{
                    pathname: "/",
                    state: { from: location }
                }} />
            }
        />
    )
}

export default PrivateRoute
