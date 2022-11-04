import './Register.css';
import React, { Component } from 'react';
class Register extends Component {
    state = {
        password: '',
        passwordLength: false,
        containsNumbers: false,
        isUpperCase: false,
        containsSymbols: false
    }

    // check to see if there is any number
    checkForNumbers(string){
        var matches = string.match(/\d+/g);
        this.setState({
            containsNumbers: matches != null ? true : false
        });
    }

    // check for upper case
    checkForUpperCase(string){
        var matches = string.match(/[A-Z]/);
        this.setState({
            isUpperCase: matches != null ? true : false
        });
    }

    // check for symbols
    checkForSymbols(string){
        var symbols = new RegExp(/[^A-Z a-z0-9]/);
        this.setState({
            containsSymbols: symbols.test(string) ? true : false
        });
    }

    // handle password
    handleChange = input => e =>{
        let targetValue = e.target.value.replace(/\s/g, '');
        this.checkForNumbers(targetValue);
        this.checkForUpperCase(targetValue);
        this.checkForSymbols(targetValue);
        this.setState({
            [input]: targetValue,
            passwordLength: targetValue.length > 7 ? true : false
        });
    }

    // submit form
    submitForm = (e) => {
        e.preventDefault();
        alert('Form submitted!');
    }

    render(){
        let {
            password,
            passwordLength,
            containsNumbers,
            isUpperCase,
            containsSymbols
        } = this.state
        let btnStatus = passwordLength && containsNumbers && isUpperCase && containsSymbols ? false : true;
    return (
        <section id='screen'>
            <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 r__right'>
                <a class="btn btn-block google-btn " href="http://localhost:5000/auth/google" role="button">
                    
                    <p className="floatright">Sign Up with Google</p><i class="fab fa-google "></i>
                </a>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 r__left'>

                    <form className='login-form' action="http://localhost:5000/api/authentication" method="POST">
                    <p>Enter your first name :</p>
                    <input className='login-item' type='text' name='firstname' required/>
                    <p>Enter your last name :</p>
                    <input className='login-item' type='text' name='lastname' required/><br/>
                    <label for="email">Please enter your email</label><br/>
                    <input className='login-item' type="email" name="username" required/><br/>
                    <label for="password">Please enter your password</label>
                        <div>
                       
                            <input type="text" class="form-control login-item" name="password" onChange={this.handleChange('password')} value={password} placeholder="Enter Password" />
                            <div>
                                <div className={passwordLength ? 'green' : 'red'}>Contains More than 8 characters</div>
                                <div className={containsNumbers ? 'green' : 'red'}>Contains numbers</div>
                                <div className={isUpperCase ? 'green' : 'red'}>Contains UpperCase</div>
                                <div className={containsSymbols ? 'green' : 'red'}>Contains Symbols</div>
                            </div>
                         
                        
                    </div>
                    <button type="submit" class="btn btn-primary login-item Submit" disabled={btnStatus}>Register</button>
                    </form>

                </div>

            </div>
        </section>
    );
}
}
  
  export default Register;