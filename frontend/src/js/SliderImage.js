import React from 'react';
export class SliderImage extends React.Component {
  onClick () {
    if (this.props.onClick) {
      this.props.onClick(this.props.src);
    }
  }
  render () {
    const imageStyle = Object.assign(
      {
        backgroundImage: 'url("' + this.props.src + '")',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
      },
      this.props.style);

    return (
      <div
        onClick={this.onClick.bind(this)}
        style={imageStyle}
      >
      </div>
    );
  }
}
SliderImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func
};
