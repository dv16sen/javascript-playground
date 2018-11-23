export default (
`//Class Decorator
const withStyles = (style) => (ChildComponent) => (
    class extends React.Component {
        render(){
            return <ChildComponent style={style} {...this.props}/>;
        }
    }
);

@withStyles({backgroundColor: "red", color: "white"})
class Container extends React.Component {
    render(){
        const {style, children, ...props} = this.props;

        return (
            <div style={{padding: "20px", ...style}} {...props}>
                {children}
            </div>
        );
    }
}

ReactDOM.render(
    <Container>I'm a decorated component</Container>,
    document.getElementById("root")
);`);