import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Protect = (props) => {
    const history = useHistory()
    const [isToken, setIsToken] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            return history.push('/')
        }
        setTimeout(() => setIsToken(token), 2000)
    },[])

    if (!isToken) {
        return <div className='parentOfSpinner'>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    }

    return props.children
}

export default Protect