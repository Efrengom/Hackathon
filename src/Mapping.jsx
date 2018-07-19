import React, { Component } from 'react'
import Display from './Display'

class Mapping extends Component {

    render() {
        return (
            <div className='flex-container-2'>
                {this.props.gifRes.map((gifRes, i) => {
                    return <Display
                        key={i}
                        index={i}
                        gifRes={gifRes} />
                })}
            </div>

        )
    }
}

export default Mapping;