import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, requiredType }) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" />
    }

    if (requiredType && user.type !== requiredType) {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute
