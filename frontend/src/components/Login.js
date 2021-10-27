import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login_user } from '../actions/actionUser';

function Login({ history }) {

    const [formData, setFormData ] = useState({
        username: '',
        password: ''
    })

    const user = useSelector(state => state.users)
    const dispatch = useDispatch();

    const loginUser = e => {
        e.preventDefault();
        if(!formData.username || !formData.password) return;
        dispatch(login_user(formData));
        setFormData({
            username: '',
            password: ''
        });
    }
    const resetForm = () => {
        setFormData({
            username: '',
            password: ''
        });
    }

    useEffect(() => {
        if(user.data && user.data.isLogged){
            history.push('/students')
        }
    }, [user])
    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-4">Login</h1>
            <form className="form" onSubmit={loginUser}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        placeholder="Enter username..."
                        name="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})}
                        className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Password</label>
                    <input 
                        placeholder="Enter password..."
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})}
                        className="form-control"/>
                </div>
                <div className="d-flex justify-content-between">
                    <input type="reset" className="btn btn-danger" onClick={resetForm}/>
                    <input type="submit" className="btn btn-success"/>
                </div>
                <p 
                    className="text-dark text-center mb-4" 
                    onClick={() => history.push('/register')}
                    style={{textDecoration: 'underline', fontSize: '12px', cursor: 'pointer'}}>No account? Click here</p>
            </form>
        </div>
    )
}

export default Login
