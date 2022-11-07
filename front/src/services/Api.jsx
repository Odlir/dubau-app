import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Counter from "../components/Counter.jsx";

const endpoint = 'http://localhost:8000/api/login'

const Api = () => {
    const [emaill, setemaill] = useState('')
    const [passsword, setpasssword] = useState('')

    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, {emaill: emaill, passsword: passsword})
            .then(function (response) {
                console.log(response);
                console.log("Successfully Logged in ");
                navigate('/dashboard')
            })
            .catch(error => {
                alert('Usuario o Contraseña incorrectos')
            })
    }
    return (
        <div>
            {/*Mando data a mi hijo*/}
            <Counter store={store} emaill={emaill} setemaill={setemaill}   passsword={passsword} setpasssword={setpasssword}  />

        </div>
       /* <div>
            <h3>Login DUB</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>emaill</label>
                    <input
                        value={emaill}
                        onChange={ (e)=> setemaill(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>passsword</label>
                    <input
                        value={passsword}
                        onChange={ (e)=> setpasssword(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
        </div>*/
    )
}

export default Api