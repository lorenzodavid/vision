/*global setInterval:false, clearInterval:false*/
import React from 'react';
import { render } from 'react-dom';
import { SliderImage } from './SliderImage';
import Carousel from 'nuka-carousel';
import { Modal } from './Modal';
import { Header } from './Header';
import Measure from 'react-measure';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      nameInput: 'hello',
      summaryText: `Ad subito autem ad
        ocibus ad ad audaces ad qui visus:
        sunt subito sunt baiolorum ut
        insaniam egere vivus autem praecentor
        orsi praecentor subito vivus autem
        exustus autem orsi quae ut crebris autem
        baiolorum ideo haut urbis qui expediendum
        conatibus Luscus Luscus exustus quod
        heiulans orsi sunt insaniam ad qui.`
    };
    this.state.summaryRowCount = this.state.summaryText.split('\n').length;
  }
  handleChange (event) {
    this.setState({
      nameInput: event.target.value
    });
  }
  componentWillMount () {
    window.addEventListener('resize', () => {
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
    });
    this.setState({
      hasPictureModal: false
    });
  }
  componentDidMount () {
  }

  componentWillUnmount () {
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
    let imageStyle = {
      height: window.innerHeight - 10
    };
    this.setState(Object.assign(
      {},
      this.state,
      {
        hasPictureModal: true,
        modalChildren: (
          <video
            src={video.src}
            autoPlay={true}
            style={imageStyle}
            controls={true}
          />
        )
      }
    ));
  }
  onImageClick (imageSource) {
    let imageStyle = {
      height: window.innerHeight - 10
    };
    this.setState(Object.assign(
      {},
      this.state,
      {
        hasPictureModal: true,
        modalChildren: (
          <img src={imageSource} style={imageStyle}/>
        )
      }));
  }
  onCustomNextClick () {
    this.state.carousels.carousel.nextSlide();
  }

  onCustomPreviousClick () {
    this.state.carousels.carousel.nextSlide();
  }
  handleTextAreaChange (event) {
    let summaryRowCount = event.target.value.split('\n').length;

    this.setState({
      summaryText: event.target.value,
      summaryRowCount
    });
  }
  render () {
    let imageSources = [
      'http://i.imgur.com/wsPDfYW.jpg',
      'http://i.imgur.com/2X8H0K3.jpg',
      'http://i.imgur.com/hpTzBw6.jpg',
      'http://i.imgur.com/C51oWqR.jpg',
      'http://i.imgur.com/FGIZklZ.jpg'
    ];
    let videoSources = [
      'http://i.imgur.com/PeBXeQg.mp4'
    ];

    let containerWidth = this.state.windowWidth;
    let containerHeight = this.state.windowHeight - 172;
    const containerStyle = {
      width: '100%',
      height: containerHeight + 'px'
    };
    const elementStyle = containerStyle;
    let images = imageSources.map(
      (src, i) => {
        return (<SliderImage
          key={i}
          src={src}
          maxHeight={containerHeight}
          maxWidth={containerWidth}
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
                    <i className="fa fa-angle-left fa-3" aria-hidden="true"></i>
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
                    <i className="fa fa-angle-right fa-3" aria-hidden="true"></i>
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
    let textAreaStyle = {
      width: '100%'
    };
    return (
      <div>
        <Header />
        <div className="designer-name">
          <input
            className="designer-name__input"
            type="text"
            value={this.state.nameInput}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <Modal isOpen={this.state.hasPictureModal} onClick={this.onModalClick.bind(this)}>
          {this.state.modalChildren}
        </Modal>
        <div style={containerStyle}>
          <Carousel
            decorators={decorators}
            wrapAround={true}
          >
            {carouseElements}
          </Carousel>
        </div>
        <div className="summary">
          <textarea
            style={textAreaStyle}
            rows={this.state.summaryRowCount}
            value={this.state.summaryText}
            onChange={this.handleTextAreaChange.bind(this)}
            className="summary__textarea"
          />
        </div>
      </div>
    );
  }
}
render(<Profile/>, document.getElementById('main'));
