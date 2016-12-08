import React from 'react';
export class SliderImage extends React.Component {
  onClick () {
    if (this.props.onClick) {
      this.props.onClick(this.props.src);
    }
  }
  render () {
    return (
      <div onClick={this.onClick.bind(this)}>
      <img src={this.props.src}/>
      </div>
    );
  }
}
SliderImage.propTypes = {
  src: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.optionalFunc
};
