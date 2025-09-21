import React from 'react'

const HomePage = () => {
    return (
        <div className="space-y-6">
            <div>HomePage</div>
            {[...Array(30)].map((_, i) => (
                <p key={i}>This is line {i + 1}</p>
            ))}
        </div>

    )
}

export default HomePage