import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import {GlobalStyle, FormStyle} from '../../styles/GlobalStyle';


import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
 <div>
   <PasswordForgetForm />
 </div>
);

const INITIAL_STATE = {
 email: '',
 error: null,
};

class PasswordForgetFormBase extends Component {
 constructor(props) {
   super(props);

   this.state = { ...INITIAL_STATE };
 }

 onSubmit = event => {
   const { email } = this.state;

   this.props.firebase
     .doPasswordReset(email)
     .then(() => {
       this.setState({ ...INITIAL_STATE });
     })
     .catch(error => {
       this.setState({ error });
     });

   event.preventDefault();
 };

 onChange = event => {
   this.setState({ [event.target.name]: event.target.value });
 };

 render() {
   const { email, error } = this.state;

   const isInvalid = email === '';

   return (
     <FormStyle>
     <form onSubmit={this.onSubmit}>
     <h1>Forgot password?</h1>
       <input
         name="email"
         value={this.state.email}
         onChange={this.onChange}
         type="text"
         placeholder="Email Address"
       />
       <button disabled={isInvalid} type="submit">
         Reset My Password
       </button>
       {error && <p>{error.message}</p>}
       <SignUpLink />

     </form>
     </FormStyle>
   );
 }
}

const PasswordForgetLink = () => (
 <p>
   <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
 </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
