import React , {Component} from "react";
import ImageView from "./imageview";
import {Container, Col,Row} from "react-grid-system";
import Card1 from "../Card1";


import axios from 'axios';
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";


class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isloaded: false,
            imageSelected: -1,
            instruction: [],
            goToRouter: 0,
        }
        this.showInstructions = this.showInstructions.bind(this);
        this.turnBack = this.turnBack.bind(this);
        this.goRouter = this.goRouter.bind(this);
        this.createTable = this.createTable.bind(this);
        this.getImages = this.getImages.bind(this);
    }

    getImages() {
        fetch('http://192.168.1.178:3003/annotationimages',{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS,HEAD'
            }})
            .then(res=>res.json())
            .then(json=> {
                this.setState({
                    isloaded: true,
                    items:json,
                })
            });
    }
    showInstructions(imageId){
        console.log("w" + imageId);
        var {imageSelected} = this.state.imageSelected;
        this.setState({
            imageSelected: imageId,
        })
    }
    turnBack(){
        var {imageSelected} = this.state.imageSelected;
        this.setState({
            imageSelected: -1,
        })
    }
    goRouter(){
        var {goToRouter} = this.state.goToRouter;
        console.log("insideGoRouter")
        this.setState({
            goToRouter: 1,
        })

    }

    createTable = (number,items) => {
        let table = []
        /*var {items} = this.state.items;*/
        console.log(number);

        // Outer loop to create parent
        for (let i = 0; i < (parseInt(number/6)) ; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < 6; j++) {
                children.push(<Col sm={2}>{<Card1 picture={items[(i*6)+j]} />} </Col>)
                //this.nextProperty()
            }
            //Create the parent and add the children
            table.push(<Row>{children}</Row>)
        }
        let finalRow = []
        console.log(number % 6);
        for(let i = 0; i < number % 6 ; i++){
            console.log(items[2]);
            finalRow.push(<Col sm={3} onClick={() => this.showInstructions(items[(parseInt(number/6))*6+i].imageId)}>{<Card1 picture={items[(parseInt(number/6))*6+i]}  />}</Col>)
            console.log("Success"+i);
        }


        table.push(<Row>{finalRow}</Row>)
        return table
    }

    render () {
        this.getImages();
        var {isloaded,items,imageSelected,instruction,goToRouter} = this.state;
        if(!isloaded){
            return (
                <div >
                    Loading...
                </div>
            )
            this.getImages();
        }

        //Image name: {item.imageName} ----- ImageUrl: {item.imageURL}
        else if( isloaded == true && imageSelected == -1){
            return (

                /*<div className="App">
                    <ul >
                        {items.map(item=>(

                            <li key = {item.imageId}>
                                <img src={item.imageURL}height="250" onClick={() => this.showInstructions(item.imageId)}/>
                            </li>

                        ))}
                    </ul>
                </div>*/
                <div className="App">
                    <h1>Image Tasks Master Command</h1>
                    <Container >
                        {this.createTable(items.length,items)}</Container>
                </div>
            )
        }
        if(imageSelected > - 1 && goToRouter == 0){
            var takenimageUrl;
            var data = items.filter(item => item.imageId == imageSelected)
            console.log(data[0].imageURL)
            console.log(instruction);
            takenimageUrl = data[0].imageURL;
            const instructionsListed = data[0].imageInstruction.map((note) =>
                <li>{note}</li>
            );
            return (
                <div >
                    <h1>Task Try</h1>
                    <button type="button" onClick={() => this.turnBack()}>Back</button>
                    <div>
                        <img className="imageShow" src={takenimageUrl} height="350"  />
                        <div>
                            <ul>{instructionsListed}</ul>
                        </div>
                    </div>

                    <Link to={{ pathname: '/annotateImage', state: { imageUrl:takenimageUrl } }}> <button type="button" >I understand the instructions</button>
                    </Link>
                </div>
            )

        }
    }
}


export default MainPage
