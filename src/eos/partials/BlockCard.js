import React from 'react';



class BlockCard extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {



    }

    render() {


        return (
            <div className="card-wrap">
                <div className="card">
                    <div className="card-header">

                        <div>
                            <div className="col col-2 right">
                                {this.props.data.timestamp}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default BlockCard

