export const render = (component: string): string => (
`ReactDOM.render(
    ${component},
    document.getElementById("root")
);`
);