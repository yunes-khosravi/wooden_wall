import React from 'react';
import { RingLoader } from 'react-spinners';
import './Loading.css';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='loading'>
        <RingLoader	
            id='loading'
          color={'#123abc'} 
          loading={this.state.loading} 
        />
      </div>
    )
  }
}
export default Loading; 