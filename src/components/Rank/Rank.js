import React from 'react'

const Rank = () => {
    return (
        <div>
            <div className='white f3'>
                {'Hey user, your current rank is....'}
            </div>

            <div className='white f1'>
                {`#${Math.floor(Math.random() * 10)}`}
            </div>
        </div>
    )
}

export default Rank
