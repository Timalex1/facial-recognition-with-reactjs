import React from 'react'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 '>
                <img src={imageUrl} alt="fa_recog" style={{ width: '500px', height: 'auto' }} id='inputimage' />
            </div>
            <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: bottomRow, left: leftCol }}></div>
        </div>
    )
}

export default FaceRecognition;