import React from 'react';

export class Modal extends React.Component {
  constructor (props) {
    super(props);
  }
  onModalElementClick () {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render () {
    const modalStyle = {
      display: this.props.isOpen ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(51,51,51,0.4)',
      zIndex: 99999
    };
    return (
      <div style={modalStyle} onClick={this.onModalElementClick.bind(this)}>
        {this.props.children}
      </div>
    );
  }
}
Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func
};
