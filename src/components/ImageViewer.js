import React, {Component} from 'react';
import './App.css';


class ImageViewer extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl: "",
            isloaded: false,
        }
        this.showInstructions = this.showInstructions.bind(this);
    }

    //get instructions
    componentDidMount() {
        /*fetch('http://localhost:3000/annotationimages')
            .then(res=>res.json())
            .then(json=> {
                this.setState({
                    isloaded: true,
                    items:json,
                })
            });*/
    }


    render () {
        var {isloaded,items} = this.state;
        //this.componentDidMount();

        if(!isloaded){
            return (
                <div >
                    Load is not suc
                </div>
            )
        }
        //Image name: {item.imageName} ----- ImageUrl: {item.imageURL}
        else{
            return (

                <div className="App">
                    <ul>

                        {items.map(item=>(

                            <li key = {item.imageId}>
                                <img src={item.imageURL}height="250" onClick={() => this.showInstructions(item.imageId)}/>
                                Image name: {item.imageId} ----- ImageUrl: {item.imageURL}
                            </li>

                        ))}
                    </ul>
                </div>
            )
        }

    }
}
export default App;