import React from 'react';
export class SliderImage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        imageWidth: 1,
        imageHeight: 1
    };
  }
  onClick () {
    if (this.props.onClick) {
      this.props.onClick(this.props.src);
    }
  }
  onLoad () {
    this.setState({
      imageWidth: this.imageElement.naturalWidth,
      imageHeight: this.imageElement.naturalHeight
    });
  }
  render () {
    // const imageStyle = Object.assign(
    //   {
    //     backgroundImage: 'url("' + this.props.src + '")',
    //     backgroundPosition: 'center',
    //     backgroundSize: 'contain',
    //     backgroundRepeat: 'no-repeat'
    //   },
    //   this.props.style);
    const imageContainerStyle = {
      display: 'flex',
      justifyContent: 'center'
    }
    let height = this.props.maxHeight;
    const aspectRatio = this.state.imageWidth / this.state.imageHeight;
    let width = height * aspectRatio;
    if (width > this.props.maxWidth) {
      width = this.props.maxWidth;
      height = width / aspectRatio;
    }
    const imageStyle = {
      height: height,
      width: width
    }
    return (
      <div
        style={imageContainerStyle}
        onClick={this.onClick.bind(this)}
      >
        <img
          ref={ (img) => {this.imageElement = img;} }
          src={this.props.src}
          style={imageStyle}
          onLoad={this.onLoad.bind(this)}
        />
      </div>
    );
  }
}
SliderImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  containerHeight: React.PropTypes.number,
  containerWidth: React.PropTypes.number
};
