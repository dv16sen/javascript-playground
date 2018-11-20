import React, {Component, Fragment} from "react";
import {Menu} from "./Menu";
import {classNames, getOptionalClasses, filterOutOptionalClasses} from "../services/className";
import {AccordionState, AccordionProps, AccordionToggleProps} from "./types/accordion";

class Accordion extends Component<AccordionProps, AccordionState> {
    static defaultProps: Partial<AccordionProps> = {
        initialElementsToShow: []
    };

    static Toggle: React.FunctionComponent<AccordionToggleProps> = ({content, ...props}) => (
        <div {...props}>{content}</div>
    );

    constructor(props: AccordionProps){
        super(props);

        this.state = {
            elementsToShow: props.initialElementsToShow
        };
    }

    getToggleClass = (i: number, {className}: {className: string}): string => classNames({
        "menu-item": true,
        "accordion-toggle": true,
        "active": this.state.elementsToShow.includes(i)
    }, className);

    getContentClass = (i: number): string => classNames({
        "hide": !this.state.elementsToShow.includes(i)
    });

    toggleElementToShow = (i: number) => () => this.setState((prevState => ({
        elementsToShow: (prevState.elementsToShow.includes(i))
            ? prevState.elementsToShow.filter(index => index !== i)
            : [i, ...prevState.elementsToShow]
    })));

    render(){
        const {className, children, initialElementsToShow, ...props} = this.props;

        const accordionClass = classNames({
            "accordion": true,
            ...getOptionalClasses(props)
        }, className);

        return (
            <Menu vertical className={accordionClass} {...filterOutOptionalClasses(props)}>
                {React.Children.map(children, (child: any, i) => (
                    <Fragment key={i}>
                        {React.cloneElement(child, {
                            className: this.getToggleClass(i, child.props),
                            onClick: (child.props.onClick)
                                ? (event) => child.props.onClick(event, i)
                                : this.toggleElementToShow(i)
                        })}
                        {(child.props.onClick) ? (
                            child.props.children
                        ) : (
                            React.cloneElement(child.props.children, {
                                className: classNames(
                                    this.getContentClass(i),
                                    (child.props.children.props)
                                        ? child.props.children.props.className
                                        : ""
                                )
                            })
                        )}
                    </Fragment>
                ))}
            </Menu>
        );
    }
}

Accordion.Toggle.displayName = "Accordion.Toggle";

export default Accordion;