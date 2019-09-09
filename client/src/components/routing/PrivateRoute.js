import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ auth: { isAuthenticated, loading }, ...rest }) => {
    if (!isAuthenticated && !loading) return <Redirect to="/login"></Redirect>;
    else {
        return <Route {...rest}></Route>;
    }
};
// (
//     <Route
//         {...rest}
//         render={props =>
//             !isAuthenticated && !loading ? (
//                 <Redirect to="/login"></Redirect>
//             ) : (
//                 <Component {...props}></Component>
//             )
//         }
//     ></Route>
// );

PrivateRoute.propTypes = {};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};
export default connect(mapStateToProps)(PrivateRoute);
