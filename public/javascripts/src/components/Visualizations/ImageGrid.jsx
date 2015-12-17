/* global $ */
var React = require("react");

var ImageGrid = React.createClass({
    getInitialState: function(){
        var self =this;
        var currData = this.props.currData;
        self.setState({gridState: 0, currData: currData, images: currData});

        return {
            gridState: 0,
            currData: currData

        };
    },
    componentWillReceiveProps: function(){
        var self =this;
        var currData = this.props.currData;
        var paginate = this.props.currData["imageGrid"].paginate;
        //console.log(currData);
        //console.log("reciveing props woot");
        self.setState({gridState: 0, currData: currData, images: currData, paginate: paginate});

    },
    onPrev: function(e){
        var self = this;
        e.preventDefault();
        var gridState = this.state.gridState;
        gridState--;

        $.get("/imageGrid/next?state="+gridState, function(data){

            self.setState({
                gridState: gridState,
                images: data
            });
        });

    }, 
    onNext: function(e){
        var self = this;
        e.preventDefault();
        var gridState = this.state.gridState;
        gridState++;
        $.get("/imageGrid/next?state="+gridState, function(data){

            self.setState({
                gridState: gridState,
                images: data
            });
        });

    },

    render: function(){
        var self = this;

        //console.log("rendering imageGrid");
        //console.log(this.props.debug);
        //var self =this;
        var currData = this.props.currData;
        //var currData = this.state.currData;
        //var data = this.state.images;
        console.log(currData["imageGrid"]["values"].length);
        var images = currData["imageGrid"]["values"];
        var finalState = currData["imageGrid"]["finalState"];
        var gridState = this.state.gridState;   
        var paginate = this.state.paginate;
        //console.log(currData);
        //console.log(this.state.gridState)
        var Img = images.map(function(d){
            var image = d["Image"];
            var URL=  image.substring(95, 95+ ("TCGA-A1-AOSD").length);
            return (
                    <span>
                    <a href={"http://imaging.cci.emory.edu/phone/camicroscope/osdCamicroscope.php?tissueId=" + URL} target="_blank"> 

                    <img src={image} width="200px" height="75px" style={{margin: "2px"}}/>
                    </a>
                    </span>
            );


        });
        if(paginate == true){
            if(gridState == 0){
                return(

                    <div id="imageGrid" >
                        <div id="imageGridImages">
                                {Img}
                        </div>
                       <div id="imageGridPagination">
                            <a href="#" className="next" onClick={this.onNext} >Next</a>
                        </div>
                    </div>

                );           
            } else if(gridState == finalState) {

                return(
                    <div id="imageGrid" >
                        <div id="imageGridImages">
                                {Img}
                        </div>
                       <div id="imageGridPagination">
                            <a href="#" className="prev" onClick={this.onPrev}>Prev</a>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div id="imageGrid" >
                        <div id="imageGridImages">
                                {Img}
                        </div>
                       <div id="imageGridPagination">
                            <a href="#" className="prev" onClick={this.onPrev}>Prev</a>
                            <a href="#" className="next" onClick={this.onNext}>Next</a>
                        </div>
                    </div>
                );
            }

        } else {
            return(

                <div id="imageGrid" >
                    <div id="imageGridImages">
                            {Img}
                    </div>

                </div>

            );     

        }


    }
});

module.exports = ImageGrid;


