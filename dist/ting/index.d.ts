/// <reference types="react" />
declare module "apng-supported" {
    const _default: true;
    export = _default;
}
declare module "ting/button" {
    import { Component } from "react";
    import * as React from "react";
    export interface ButtonProps {
        type?: string;
        disabled?: boolean;
        block?: boolean;
        size?: string;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        [key: string]: any;
    }
    export interface ButtonStates {
    }
    export class Button extends Component<ButtonProps, ButtonStates> {
        renderAnchor(className: string, rest: object): JSX.Element;
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
declare module "webp-animation-supported" {
    const _default: true;
    export = _default;
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
declare module "ting/router" {
    import { Component } from "react";
    import * as React from "react";
    export class HashRouter extends Component<any, any> {
        render(): React.ReactNode;
    }
    export interface RouteProps {
        path?: string;
        location?: string;
        exact?: boolean;
        component?: React.ComponentType<any>;
        import?: string;
        export?: string;
    }
    export interface RouteStates {
        currentPath?: string;
        component?: React.ComponentType<any>;
    }
    export class Route extends Component<RouteProps, RouteStates> {
        private location;
        private isLoading;
        constructor(props: RouteProps, context: any);
        componentWillUnmount(): void;
        componentWillMount(): void;
        render(): {};
        checkChild(children: any, location: any): void;
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
    export interface HChildProps {
        width: number;
        className?: string;
    }
    export interface VChildProps {
        height?: number;
        className?: string;
    }
    export interface LayoutProps {
        full?: boolean;
        height?: number | string;
        className?: string;
        dirction?: number;
    }
    export interface LayoutStates {
    }
    export class Layout extends React.Component<LayoutProps, LayoutStates> {
        render(): JSX.Element;
    }
    export class VGroup extends React.Component<LayoutProps, LayoutStates> {
        static defaultProps: {
            className: string;
        };
        renderTable(): JSX.Element | {
            children: React.ReactNode;
        };
        renderFlex(): JSX.Element;
        render(): JSX.Element | {
            children: React.ReactNode;
        };
    }
    export class HGroup extends React.Component<LayoutProps, LayoutStates> {
        static defaultProps: {
            className: string;
        };
        renderTable(): JSX.Element | {
            children: React.ReactNode;
        };
        renderFlex(): JSX.Element;
        render(): JSX.Element | {
            children: React.ReactNode;
        };
    }
    export class Header extends React.Component<VChildProps, any> {
        static defaultProps: {
            className: string;
        };
        renderTable(): JSX.Element;
        renderFlex(): JSX.Element;
        render(): JSX.Element;
    }
    export class Sider extends React.Component<HChildProps, any> {
        static defaultProps: {
            className: string;
        };
        renderTableQuirks(): JSX.Element;
        renderTable(): JSX.Element;
        renderFlex(): JSX.Element;
        render(): JSX.Element;
    }
    export class Content extends React.Component<LayoutProps, any> {
        constructor(props: any, context: any);
        renderTable(): JSX.Element;
        renderTableQuirks(): JSX.Element;
        renderFlex(): JSX.Element;
        render(): JSX.Element;
    }
    export var Footer: typeof Header;
}
declare module "ting" {
    import * as button from "ting/button";
    import * as icon from "ting/icon";
    import * as loader from "ting/router";
    import * as layout from "ting/layout";
    const _default: {
        Layout: typeof layout.Layout;
        VGroup: typeof layout.VGroup;
        HGroup: typeof layout.HGroup;
        Header: typeof layout.Header;
        Sider: typeof layout.Sider;
        Content: typeof layout.Content;
        Footer: typeof layout.Header;
        navigate(path: any): void;
        linkClickHandle(e: any): void;
        HashRouter: typeof loader.HashRouter;
        Route: typeof loader.Route;
        Link: typeof loader.Link;
        Icon: typeof icon.Icon;
        Button: typeof button.Button;
        ButtonGroup: typeof button.ButtonGroup;
        ButtonToolbar: typeof button.ButtonToolbar;
    };
    export = _default;
}
