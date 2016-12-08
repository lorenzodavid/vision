/*global setInterval:false, clearInterval:false*/
import React from 'react';
import { render } from 'react-dom';
// import Slider from 'react-slick';
import { SliderImage } from './SliderImage';
// var Carousel = require('nuka-carousel');
import Carousel from 'nuka-carousel';
import { Modal } from './Modal';

class Timer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      secondsElapsed: 0
    };
    this.mixins = [Carousel.ControllerMixin];

  }
  tick () {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1,
      hasPictureModal: prevState.hasPictureModal
    }));
  }
  componentWillMount () {
    this.setState({
      hasPictureModal: true
    });
  }
  componentDidMount () {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }
  onModalClick () {
    let willHaveModal = !this.state.hasPictureModal;
    this.setState(Object.assign(
      {},
      this.state,
      {
        hasPictureModal: willHaveModal,
        modalChildren: this.state.hasPictureModal ? [] : this.state.modalChildren
      }));
  }
  onImageClick (imageSource) {
    this.setState(Object.assign(
      {},
      this.state,
      {
        hasPictureModal: true,
        modalChildren: (
          <img src={imageSource}/>
        )
      }));
  }
  render () {
    let imageSources = [
      'http://i.imgur.com/wsPDfYW.jpg',
      'http://i.imgur.com/hpTzBw6.jpg',
      'http://i.imgur.com/C51oWqR.jpg'
    ];
    let videoSources = [
      'http://i.imgur.com/PeBXeQg.mp4'
    ];
    let images = imageSources.map((src, i) => <SliderImage key={i} src={src} onClick={this.onImageClick.bind(this)}/>);
    let videos = videoSources.map((src, i) => <video key={i + images.length}src={src}/>);
    let containerWidth = 400;
    const containerStyle = {
      width: containerWidth + 'px'
    };

    return (
      <div>
        <Modal isOpen={this.state.hasPictureModal} onClick={this.onModalClick.bind(this)}>
          {this.state.modalChildren}
        </Modal>
        <div>Seconds Elapsed:
          {this.state.secondsElapsed}
        </div>
        <div style={containerStyle}>
          <Carousel wrapAround={false}>
            {images}
            {videos}
          </Carousel>
        </div>
      </div>
    );
  }
}
render(<Timer/>, document.getElementById('main'));
