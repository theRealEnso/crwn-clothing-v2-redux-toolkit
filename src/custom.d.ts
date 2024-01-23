declare module "*.svg" {
    //to address type errors in cart-icon-styles + Navigation component when working with SVG files / elements
    //import react. Next, need to export ReactComponent as a type of functional component of React ecosystem. Since we are typing an SVG element, pass in React.SVGProps, passing in SVGSVGElement
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}