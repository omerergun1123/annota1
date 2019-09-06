import React from 'react';
import PropTypes from 'prop-types';


const Card1 = ({picture}) => {
    const {imageId, imageName, imageURL,imageInstruction} = picture;
    return (
        <div id={`card-${imageId}`} className="card">
            <img src={imageURL}/>
            <div className="details">
                <span className="index" >{imageId}</span>
                <p className="Image-Name">
                    {imageName}
                </p>
            </div>
        </div>
    )
}



Card1.propTypes = {
    picture: PropTypes.object.isRequired
}

export default Card1;