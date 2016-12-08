/*global setInterval:false, clearInterval:false*/
import React from 'react';
import { render } from 'react-dom';
import { SliderImage } from './SliderImage';
import Carousel from 'nuka-carousel';
import { Modal } from './Modal';
import reactMixin from 'react-mixin';

class Timer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      carousels: {},
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
  onVideoClick (event) {
    let video = event.target;
    this.setState(Object.assign(
      {},
      this.state,
      {
        hasPictureModal: true,
        modalChildren: (
          <video src={video.src} autoPlay={true}/>
        )
      }
    ));
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
    let containerWidth = 400;
    let containerHeight = 400;
    const containerStyle = {
      width: containerWidth + 'px',
      height: containerHeight + 'px'
    };
    const elementStyle = containerStyle;
    let images = imageSources.map(
      (src, i) => {
        return (<SliderImage
          key={i}
          src={src}
          onClick={this.onImageClick.bind(this)}
          style={elementStyle}
        />);
      });
    let videos = videoSources.map((src, i) => {
      return (<video
        key={i + images.length}
        src={src}
        onClick={this.onVideoClick.bind(this)}
        style={elementStyle}
      />);
    });

    let carouseElements = images.concat(videos);

    return (
      <div>
        <Modal isOpen={this.state.hasPictureModal} onClick={this.onModalClick.bind(this)}>
          {this.state.modalChildren}
        </Modal>
        <div>Seconds Elapsed:
          {this.state.secondsElapsed}
        </div>
        <div style={containerStyle}>
          <Carousel
            ref="carousel"
            data={this.mixins[0].setCarouselData.bind(this, 'carousel')}
            wrapAround={false}
          >
            {carouseElements}
          </Carousel>

          {this.state.carousels.carousel ? <button type="button" onClick={this.state.carousels.carousel.goToSlide.bind(null, 2)}>
            Go to slide 5
          </button> : null}
        </div>
      </div>
    );
  }
}

reactMixin(Timer, Carousel.ControllerMixin);
render(<Timer/>, document.getElementById('main'));
