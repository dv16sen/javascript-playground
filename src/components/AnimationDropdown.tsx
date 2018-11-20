import React, {FunctionComponent} from "react";

export const animations: {[key: string]: string[]} = {
    "Attention Seekers": [
        "bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello"
    ],
    "Bouncing Entrances": [
        "bounceIn", "bounceInLeft", "bounceInRight", "bounceInUp"
    ],
    "Bouncing Exits": [
        "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp"
    ],
    "Fading Entrances": [
        "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig",
        "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig"
    ],
    "Fading Exits": [
        "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig",
        "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig"
    ],
    "Flippers": [
        "flip", "flipInX", "flipInY", "flipOutX", "flipOutY"
    ],
    "Lightspeed": [
        "lightSpeedIn", "lightSpeedOut"
    ],
    "Rotating Entrances": [
        "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight"
    ],
    "Rotating Exits": [
        "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft",
        "rotateOutUpRight"
    ],
    "Sliding Entrances": [
        "slideInUp", "slideInDown", "slideInLeft", "slideInRight"
    ],
    "Sliding Exits": [
        "slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight"
    ],
    "Zoom Entrances": [
        "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp"
    ],
    "Zoom Exits": [
        "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp"
    ],
    "Specials": [
        "hinge", "jackInTheBox", "rollIn", "rollOut"
    ]
};

export const AnimationDropdown: FunctionComponent = (props) => (
    <select {...props}>
        {Object.keys(animations).map((animationGroup, i) => (
            <optgroup label={animationGroup} key={i}>
                {animations[animationGroup].map((animation, j) => (
                    <option value={animation} key={j}>{animation}</option>
                ))}
            </optgroup>
        ))}
    </select>
);