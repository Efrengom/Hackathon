import React, { Component } from 'react'


class Display extends Component {


    render() {
        var gifRes = this.props.gifRes
        return(
                <img src={gifRes.images.original.url}></img>
        
        )
    }
}

export default Display;