import React from 'react';
import './App.css';
import ipfsClient from 'ipfs-http-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: '', ver: '', hash: '', link: 'http://localhost:8080/ipfs'};

  }

  async componentDidMount() {
    const ipfs = ipfsClient('http://127.0.0.1:5001')
    console.log('this is ipfs: ', ipfs)
    try {
      const ver = await ipfs.version()
      console.log("IPFS Version=", ver)
    }
    catch(error) {
      console.log('error: ', error)
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  async _handleAddToIPFS(e) {
    console.log('clicked!')
    const { file, link } = this.state;
    const ipfs = ipfsClient('http://127.0.0.1:5001')
    try {
      for await (const result of ipfs.add(file)) {
        console.log('this is result: ', result)
        this.setState({
          link: 'http://localhost:8080/ipfs/' + result.path
        });
      }
    }
    catch(error) {
      console.log('add to IPFS failed: ', error)
    }
  }

  render() {
    const {imagePreviewUrl, link} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img alt='' src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }


    return (
      <div className="App">
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            {/* <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image
            </button> */}
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleAddToIPFS(e)}>Add to IPFS
            </button>
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
        <div>
          <button onClick={() => {
            window.open(link, '_blank')
            console.log('clicked!')
          }}>{link}</button>
        </div>
      </div>
    );
  }
  
}

export default App;
