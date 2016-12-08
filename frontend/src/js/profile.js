/*global setInterval:false, clearInterval:false*/
import React from 'react';
import { render } from 'react-dom';
import { SliderImage } from './SliderImage';
import Carousel from 'nuka-carousel';
import { Modal } from './Modal';
import reactMixin from 'react-mixin';

class Profile extends React.Component {
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
      hasPictureModal: false
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
  onCustomNextClick () {
    this.state.carousels.carousel.nextSlide();
  }

  onCustomPreviousClick () {
    this.state.carousels.carousel.nextSlide();
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
    let decorators =
      [
        {
          component: React.createClass(
            {
              displayName: 'PreviousSlideButton',
              render () {
                return (
                  <button
                  onClick={this.props.previousSlide}>
                  Previous Slide
                  </button>
                );
              }
            }
          ),
          position: 'CenterLeft',
          style: {
            padding: 0
          }
        },
        {
          component: React.createClass(
            {
              displayName: 'NextSlideButton',
              render () {
                return (
                  <button
                  onClick={this.props.nextSlide}>
                  next Slide
                  </button>
                );
              }
            }
          ),
          position: 'CenterRight',
          style: {
            padding: 0
          }
        },
        {
          component: React.createClass({
            displayName: 'bottomNav',
            render () {
              let bottomNavStyle = {
              };
              let dots = [];
              let buttonStyle = {
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '100%',
                background: 'black',
                boxShadow: 'white 0 0 3px'
              };
              dots = carouseElements.map((elt, i) => {
                let fn = () => {
                  this.props.goToSlide(i);
                };
                let enabled = (
                  <button onClick={fn} key={i}>
                    <div style={buttonStyle}>
                    </div>
                  </button>
                );
                let disabled = (
                  <button onClick={fn} disabled key={i}>
                    <div style={buttonStyle}>
                    </div>
                  </button>
                );
                return this.props.currentSlide === i ? disabled : enabled;
              });

              return (
                <div style={bottomNavStyle}>
                  {dots}
                </div>
              );
            }
          }),
          position: 'BottomCenter',
          style: {
            padding: 0
          }
        }
      ];

    return (
      <div>
        <input type="text" />
        <Modal isOpen={this.state.hasPictureModal} onClick={this.onModalClick.bind(this)}>
          {this.state.modalChildren}
        </Modal>
        <div>Seconds Elapsed:
          {this.state.secondsElapsed}
        </div>
        <div style={containerStyle}>
          <Carousel
            decorators={decorators}
            ref="carousel"
            data={this.mixins[0].setCarouselData.bind(this, 'carousel')}
            wrapAround={true}
          >
            {carouseElements}
          </Carousel>
          {this.state.carousels.carousel ? <button type="button" onClick={this.onCustomPreviousClick.bind(this)}>
          previous
          </button> : null}
          {this.state.carousels.carousel ? <button type="button" onClick={this.onCustomNextClick.bind(this)}>
            Next
          </button> : null}
        </div>
      </div>
    );
  }
}

reactMixin(Profile, Carousel.ControllerMixin);
render(<Profile/>, document.getElementById('main'));
