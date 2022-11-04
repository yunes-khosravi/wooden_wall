import './Login.css';
import {Link} from 'react-router-dom';
const Register = () => {
    return (
        <section id='screen'>
            <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                <a class="btn btn-block google-btn" href="http://localhost:5000/auth/google" role="button">
                    
                    <p className='floatright'>Sign In with Google</p><i  class="fab fa-google"></i>
                </a>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
                    
                    <form className='login-form' action="http://localhost:5000/api/log" method="POST">
                    <label for="email">Please enter your email</label><br/>
                    <input className='login-item' type="email" name="username" /><br/>
                    <label for="password">Please enter your password</label>
                    <input type="password" class="form-control login-item" name="password"/>
                    <button type="submit" class="btn btn-success login-item">Login</button>
                    </form>
                    <center><h3 className="register-tag">Sign up for free :</h3><Link to='/register'>Sign Up</Link> </center>
                </div>

            </div>

        </section>
    );
  };
  
  export default Register;
