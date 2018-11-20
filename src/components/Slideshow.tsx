import React, {Component} from "react";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {Animation} from "./Animation";
import {SlideshowProps, SlideshowState} from "./types/slideshow";

class Slideshow extends Component<SlideshowProps, SlideshowState> {
    timer?: NodeJS.Timeout;

    static animationStatus = {
        idle: "idle",
        out: "out",
        in: "in"
    };

    static defaultProps: Partial<SlideshowProps> = {
        className: "",
        leftIcon: <i className="fas fa-angle-left"/>,
        rightIcon: <i className="fas fa-angle-right"/>,
        animation: "fadeIn",
        outAnimation: "fadeOut",
        duration: 400,
        autoplaySpeed: 0,
        onStateChange: () => {},
        stateReducer: (state, changes) => changes
    };

    constructor(props: SlideshowProps){
        super(props);

        this.state = {
            active: 0,
            canChangeSlide: true,
            animationStatus: Slideshow.animationStatus.idle
        }
    }

    componentDidMount(){
        if(this.autoplayIsEnabled()){
            this.timer = setInterval(() => {
                this.setActiveState((prevActive: number) =>
                    (prevActive+1 < React.Children.count(this.props.children))
                        ? prevActive+1
                        : 0,
                );
            }, this.props.autoplaySpeed);
        }
    }

    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }

    sleep = (duration: number) => new Promise(resolve => setTimeout(() => resolve(), duration));

    autoplayIsEnabled = () => (this.props.autoplaySpeed > 0);

    awaitAnimation = () => this.sleep(this.props.duration);

    internalSetState = (changes: any, callback: (changes?: any) => any = () => {}) => {
        let allChanges: any;

        this.setState(() => {
            allChanges = this.props.stateReducer(this.state, changes);
            return allChanges;
        }, () => {
            this.props.onStateChange(allChanges);
            callback(allChanges);
        });
    };

    setActiveState = (activeUpdater: any) => {
        this.internalSetState({
            canChangeSlide: false,
            animationStatus: Slideshow.animationStatus.out
        }, () => {
            this.awaitAnimation().then(() => {
                this.internalSetState({
                    active: activeUpdater(this.state.active),
                    animationStatus: Slideshow.animationStatus.in
                }, () => {
                    this.awaitAnimation().then(() => {
                        this.internalSetState({
                            canChangeSlide: true,
                            animationStatus: Slideshow.animationStatus.idle
                        });
                    });
                });
            });
        });
    };

    removeExtraProps = ({
        autoplaySpeed,
        onStateChange,
        stateReducer,
        duration,
        ...props
    }: Partial<SlideshowProps>) => props;

    render(){
        const {
            children,
            leftIcon,
            rightIcon,
            animation,
            outAnimation,
            className,
            ...props
        } = this.removeExtraProps(this.props);

        const {
            animationStatus,
            canChangeSlide
        } = this.state;

        if(!rightIcon || !leftIcon) return null;

        const childrenCount = React.Children.count(children);
        const rightIconClass = classNames({
            "unclickable": !canChangeSlide,
            "disabled": !canChangeSlide
        }, rightIcon.props.className);
        const leftIconClass = classNames({
            "unclickable": !canChangeSlide,
            "disabled": !canChangeSlide,
        }, leftIcon.props.className);
        const slideshowClass = classNames({
            ...getOptionalClasses(props),
            "slideshow": true
        }, className);

        return (
            <div className={slideshowClass} {...filterOutOptionalClasses(props)}>
                {React.cloneElement(leftIcon, {
                    className: leftIconClass,
                    onClick: () => {
                        if(canChangeSlide){
                            this.setActiveState((prevActive: number) =>
                                ((prevActive-1 >= 0) ? prevActive-1 : childrenCount - 1)
                            );
                        }
                    }
                })}
                {React.Children.map(children, (child, i) => (
                    (this.state.active === i) ? (
                        <Animation
                            key={animationStatus}
                            duration={this.props.duration}
                            animation={
                                (animationStatus === Slideshow.animationStatus.out)
                                    ? outAnimation
                                    : (animationStatus === Slideshow.animationStatus.in)
                                        ? animation : ""
                            }
                        >
                            {child}
                        </Animation>
                    ) : null
                ))}
                {React.cloneElement(rightIcon, {
                    className: rightIconClass,
                    onClick: () => {
                        if(canChangeSlide){
                            this.setActiveState((prevActive: number) =>
                                (prevActive+1 < childrenCount) ? prevActive+1 : 0,
                            );
                        }
                    }
                })}
            </div>
        );
    }
}

export default Slideshow;