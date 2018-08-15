import * as React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
  user?: boolean;
  loginPath: string;
  canView?: () => boolean;
}

export default class PrivateRoute extends React.Component<PrivateRouteProps> {
  render() {
    const { component, render, canView, loginPath, user, ...rest } = this.props;
    const canViewFunc = canView || (() => (user ? true : false));
    const Component: any = component;
    return (
      <Route
        {...rest}
        render={(props: RouteComponentProps<{}>) => {
          return canViewFunc() ? (
            component ? (
              <Component />
            ) : (
              render!(props)
            )
          ) : (
            <Redirect
              to={{
                pathname: loginPath,
                state: { redirectTo: props.location.pathname },
              }}
            />
          );
        }}
      />
    );
  }
}
