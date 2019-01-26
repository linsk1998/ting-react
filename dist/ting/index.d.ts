/// <reference types="react" />
declare module "support/apng-supported-plugin!" {
    const _default: true;
    export default _default;
}
declare module "support/apng-supported" {
    import supported from "support/apng-supported-plugin!";
    export default supported;
}
declare module "support/webp-animation-supported-plugin!" {
    const _default: true;
    export default _default;
}
declare module "support/webp-animation-supported" {
    import supported from "support/webp-animation-supported-plugin!";
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
    export class Link extends Component<{
        to: string;
        [key: string]: any;
    }, any> {
        render(): JSX.Element;
    }
    export function navigate(path: any): void;
    export function linkClickHandle(e: any): void;
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
declare module "ting" {
    export * from "ting/button";
    export * from "ting/icon";
    export * from "ting/router";
    export * from "ting/layout";
}
