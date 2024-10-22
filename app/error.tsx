"use client"
import React from 'react'

interface Props {
    error: Error
    reset: () => void
}

const ErrorPage = ({error, reset}: Props) => {
    console.log("Error", error);
    return (
        <div>
            <h1>An unexpected error has occurred</h1>
            <button className='btn' onClick={() => reset()}>Retry</button>
        </div>
    )
}

export default ErrorPage