import React,{Component} from "react";
import {Link} from "react-router-dom";

class imageView extends Component {

    constructor(props){
        super(props);
        var {imageUrl} = props.location.state
        this.state = {
            imageUrl: imageUrl,
        }
    }

    render() {
        var imageUrl = this.state.imageUrl;
        return (
            <img className="imageShow" src={imageUrl} height="350"  />
        )
    }
}

export default imageView