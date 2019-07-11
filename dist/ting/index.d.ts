/// <reference types="react" />
declare module "support/apng-plugin!" {
    const _default: true;
    export default _default;
}
declare module "support/apng" {
    import supported from "support/apng-plugin!";
    export default supported;
}
declare module "support/webp-animation-plugin!" {
    const _default: true;
    export default _default;
}
declare module "support/webp-animation" {
    import supported from "support/webp-animation-plugin!";
    export default supported;
}
declare module "support/svg-img-plugin!" {
    const _default: true;
    export default _default;
}
declare module "support/svg-img" {
    import supported from "support/svg-img-plugin!";
    export default supported;
}
declare module "ting/icon" {
    import { Component } from "react";
    export interface IProps {
        size?: number;
        src?: string;
        svg?: string;
        apng?: string;
        webp?: string;
        png?: string;
        gif?: string;
        [key: string]: any;
    }
    export interface IStates {
    }
    export class Icon extends Component<IProps, IStates> {
        renderFont(size: any, children: any, rest: any): JSX.Element;
        renderEmoji(size: any, children: any, rest: any): JSX.Element;
        renderImg(size: number, src: string, rest: any): JSX.Element;
        renderPng32(size: number, src: string, rest: any): JSX.Element;
        renderSVG(size: number, src: string, rest: any): JSX.Element;
        render(): JSX.Element;
    }
}
declare module "ting/utils" {
    export function bindComponentEvent(component: any, callback: any): (e: any) => void;
}
declare module "ting/button" {
    import { Component } from "react";
    export interface ButtonProps extends ButtonStates {
        type?: "button" | "submit";
        onClick?: (e?: MouseEvent, btn?: Button) => boolean | void;
        [key: string]: any;
    }
    export interface ButtonStates {
        href?: string;
        theme?: "default" | "primary" | "success" | "info" | "warning" | "danger";
        disabled?: boolean;
        block?: boolean;
        size?: "xs" | "sm" | "lg";
    }
    export class Button extends Component<ButtonProps, ButtonStates> {
        constructor(props: any, context: any);
        renderAnchor(className: string, rest: any): JSX.Element;
        renderButton(className: string, rest: object): JSX.Element;
        render(): JSX.Element;
    }
    export class ButtonGroup extends Component {
        render(): JSX.Element;
    }
    export class ButtonToolbar extends Component {
        render(): JSX.Element;
    }
}
declare module "ting/router" {
    import { Component } from "react";
    import * as React from "react";
    export class MemoryRouter extends Component<{}, {
        currentPath: string;
    }> {
        constructor(props: any, context: any);
        render(): JSX.Element;
    }
    export class BrowserRouter extends Component<{}, {
        currentPath: string;
    }> {
        constructor(props: any, context: any);
        render(): JSX.Element;
    }
    export class HashRouter extends Component<{}, {
        currentPath: string;
    }> {
        constructor(props: any, context: any);
        componentWillUnmount(): void;
        componentWillMount(): void;
        render(): JSX.Element;
    }
    export interface RouteProps {
        path?: string;
        exact?: boolean;
        component?: React.ComponentType<any>;
        [key: string]: any;
    }
    export class Route extends Component<RouteProps, {}> {
        static defaultProps: {
            path: string;
        };
        render(): JSX.Element;
    }
    export class IndexRoute extends Component<RouteProps, {}> {
        static defaultProps: {
            path: string;
        };
        render(): JSX.Element;
    }
    export class Switch extends Component<{}, {}> {
        render(): JSX.Element;
    }
    export class NavLink extends Component<{
        to: string;
        activeClassName?: string;
        exact?: boolean;
        className?: string;
        [key: string]: any;
    }, any> {
        static defaultProps: {
            className: string;
            activeClassName: string;
        };
        render(): JSX.Element;
    }
    export class NavItem extends Component<{
        path?: string;
        activeClassName?: string;
        exact?: boolean;
        className?: string;
        index?: boolean;
    }, any> {
        static defaultProps: {
            className: string;
            activeClassName: string;
        };
        render(): JSX.Element;
    }
    export class Link extends Component<{
        to: string;
        [key: string]: any;
    }, any> {
        render(): JSX.Element;
    }
}
declare module "ting/layout" {
    import * as React from "react";
    export var supportFlex: boolean;
    export var isQuirks: boolean;
    export const enum POSITION {
        LEFT = 0,
        RIGHT = 1,
        TOP = 2,
        BUTTON = 3
    }
    export const enum DIRCTION {
        H = 1,
        V = 2
    }
    export const enum LAYOUT {
        FLEX = 1,
        TABLE = 2,
        NONE = 0
    }
    export interface ContentProps {
        className?: string;
    }
    export interface SiderProps {
        width?: number;
        className?: string;
    }
    export interface VShrinkProps {
        height?: number;
        className?: string;
    }
    export interface LayoutProps {
        height?: number | string;
        className?: string;
    }
    export class Layout extends React.Component<LayoutProps, {}> {
        static defaultProps: {
            className: string;
        };
        render(): JSX.Element;
    }
    export class VGroup extends React.Component<LayoutProps, {}> {
        static defaultProps: {
            className: string;
        };
        render(): JSX.Element;
        renderFlex(): JSX.Element;
        renderTableQuirks(): JSX.Element;
        renderDiv(): JSX.Element;
    }
    export class HGroup extends React.Component<LayoutProps, {}> {
        static defaultProps: {
            className: string;
        };
        render(): JSX.Element;
        renderFlex(): JSX.Element;
        renderTableQuirks(): JSX.Element;
        renderTable(): JSX.Element;
    }
    export class Header extends React.Component<VShrinkProps, any> {
        static defaultProps: {
            className: string;
        };
        render(): React.ReactNode;
    }
    export var Footer: typeof Header;
    export class Sider extends React.Component<SiderProps, any> {
        static defaultProps: {
            className: string;
        };
        render(): React.ReactNode;
    }
    export class Content extends React.Component<ContentProps, any> {
        static defaultProps: {
            className: string;
        };
        render(): React.ReactNode;
    }
}
declare module "ting/grid" {
    import { Component } from "react";
    import * as React from "react";
    export interface RowProps {
        cols?: number;
        gutter?: number;
    }
    export interface ColProps {
        span?: number;
    }
    export class Row extends Component<RowProps, {}> {
        static defaultProps: {
            gutter: number;
            cols: number;
        };
        cols: number;
        constructor(props: any, context: any);
        render(): JSX.Element;
        renderFlex(): JSX.Element;
        renderInlineBlock(): JSX.Element;
        renderBorder(): JSX.Element;
        renderTable(): React.DetailedReactHTMLElement<{
            width: string;
            border: number;
            cellSpacing: number;
            cellPadding: number;
            className: string;
        }, HTMLElement>;
    }
    export class Col extends React.Component<ColProps, any> {
        static defaultProps: {
            span: number;
        };
        render(): React.ReactNode;
    }
}
declare module "ting/collapse" {
    import { Component } from "react";
    export interface CollapseProps {
        inverse?: boolean;
    }
    export interface CollapsePanelState {
        actived?: boolean;
        header: string;
        icon?: string;
    }
    export class Collapse extends Component<CollapseProps, {}> {
        render(): JSX.Element;
    }
    export class CollapsePanel extends Component<CollapsePanelState, CollapsePanelState> {
        constructor(props: any);
        toggle(): void;
        render(): JSX.Element;
    }
}
declare module "ting/carousel" {
    import { Component } from "react";
    export interface CarouselProps {
        autoplay?: boolean;
        dots?: boolean;
    }
    export class Carousel extends Component<CarouselProps, {}> {
        render(): any;
    }
    export function CarouselItem(): any;
}
declare module "ting" {
    export * from "ting/button";
    export * from "ting/icon";
    export * from "ting/router";
    export * from "ting/layout";
    export * from "ting/grid";
    export * from "ting/collapse";
    export * from "ting/carousel";
}
