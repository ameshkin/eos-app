import React from 'react';
import axios from "axios/index";
import BlockCard from "../partials/BlockCard";
import TimeAgo from 'react-timeago'
import md from 'materialize-css'

import { Button, Colors } from 'react-foundation'

class BlockList extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            blocks : []
        };

        this.reloadBlocks = this.reloadBlocks.bind(this);
    }


    //function to handle reload button and load data on render
    reloadBlocks() {
        var url = 'http://localhost:7777/api/v1/blocks'

        axios.get(url)
            .then((response) => {
                //Log.err(response.data.menu,"28",debug);

                console.dir(response.data);
                this.setState({ blocks: response.data});
            });
    }

    componentDidMount() {
        this.reloadBlocks();
    }

    render() {


        return (
            <div className={"app-wrapper"}>
                <div id="grid" className="row">
                    <div className="cell medium-12">
                        <Button color={Colors.SUCCESS} onClick={this.reloadBlocks}>Reload</Button>
                    </div>

                </div>


                <div id="grid" className="row">
                    <div className="cell medium-12">
                    {
                        this.state.blocks.map((block, i) => {
                            return (

                                <div className="card" key={i}>


                                    <div className="card-content">

                                        <span className="card-title">
                                            <h3>Block {block.id}</h3>
                                            <p>timestamp: {block.timestamp}</p>
                                        </span>



                                        <div>Mined <TimeAgo date={block.timestamp} /> </div>

                                        <div>{Object.keys(block.transactions).length} Transactions</div>

                                        <span className="activator card-title grey-text text-darken-4"><i
                                            className="material-icons right">More Details</i></span>


                                    </div>

                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">Block Details<i
                                            className="material-icons right">close</i></span>

                                        <p>Producer: {block.producer}</p>
                                        <p>Producer Signature: {block.producer_signature}</p>
                                        <p>ref_block_prefix:  {block.ref_block_prefix}</p>
                                        <p>schedule_version:  {block.schedule_version}</p>
                                    </div>
                                </div>

                            );
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
}

/*
     {
                        this.state.blocks.map((block, i) => {
                            return (
                                <BlockCard data={block} />
                            );
                        })
                    }
 */

export default BlockList
