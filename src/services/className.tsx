import classnames from 'classnames';

export const className = (string = "") =>{
    return (string === "") ? {} : {
        className: string
    };
};

export const classNames = (optionalClasses: object | string, className2 = "") =>{
    return classnames(optionalClasses, className2);
};

export const joinClassNames = (className1: string, className2 = "") =>{
    return (className2 === '') ? className1 : [className1, className2].join(' ');
};

export interface OptionalClasses {
    disabled?: boolean,
    segment?: boolean,
    loading?: boolean,
    padder?: number,
    message?: boolean,
    inverted?: boolean,
    wrapper?: number,
    container?: number,
    tooltip?: boolean,
    inline?: boolean,
    light?: boolean,
    dark?: boolean,
    glass?: boolean,
    inset?: boolean,
    hero?: boolean,
    show?: boolean
}

export const getOptionalClasses = ({
    disabled,
    segment,
    loading,
    padder,
    message,
    inverted,
    wrapper,
    container,
    tooltip,
    inline,
    light,
    dark,
    glass,
    inset,
    hero,
    show
}: Partial<OptionalClasses>) => ({
    "disabled": disabled,
    "segment": segment,
    "message": message,
    "inverted": inverted,
    "loading": loading,
    [`wrapper-${wrapper}`]: typeof wrapper === "number",
    [`container-${container}`]: typeof container === "number",
    [`padder-${padder}`]: typeof padder === "number",
    "tooltip-container": tooltip,
    "inline": inline,
    "light": light,
    "dark": dark,
    "glass": glass,
    "inset": inset,
    "hero": hero,
    "show": show,
    "hide": !show && typeof show === "boolean",
    "controlled": typeof show === "boolean"
});

export const filterOutOptionalClasses = ({
    segment,
    loading,
    padder,
    inverted,
    message,
    wrapper,
    container,
    tooltip,
    inline,
    light,
    dark,
    glass,
    inset,
    hero,
    show,
    ...props
}: Partial<OptionalClasses>) => props;