import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register_user } from '../actions/actionUser';

//styles
import { 
    Modal,
    ModalHeader
} from 'reactstrap'


function Register({ history }) {

    const [ modalShow, setModalShow ] = useState(false)
    const toggleModal = useCallback(() => setModalShow(!modalShow), [modalShow]);
    const [formData, setFormData ] = useState({
        username: '',
        password: ''
    })


    const users = useSelector(state => state.users);
    const dispatch = useDispatch()

    const registerUser = e => {
        e.preventDefault();
        if(!formData.username || !formData.password) return;
        dispatch(register_user(formData));
        console.log(formData)
        setFormData({
            username: '',
            password: ''
        });
        toggleModal(); //show modal
    }

    const resetForm = () => {
        setFormData({
            username: '',
            password: ''
        });
    }
    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-4">Register</h1>
            <form className="form" onSubmit={registerUser}>
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
                <p className="text-dark text-center mb-4" 
                    onClick={() => history.push('/')}
                    style={{textDecoration: 'underline', fontSize: '12px', cursor: 'pointer'}}>Already have an account? Click here</p>
            </form>
            {/* modals */}
            <Modal toggle={toggleModal} isOpen={modalShow}>
                <ModalHeader toggle={toggleModal} className="bg-dark text-center">
                   <h3 className="text-success">{users.message}</h3>
                </ModalHeader>
            </Modal>
        </div>
    )
}

export default Register
