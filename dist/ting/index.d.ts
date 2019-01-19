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
    import * as button from "ting/button";
    import * as icon from "ting/icon";
    import * as loader from "ting/router";
    import * as layout from "ting/layout";
    const _default: {
        supportFlex: boolean;
        isQuirks: boolean;
        POSITION: typeof layout.POSITION;
        DIRCTION: typeof layout.DIRCTION;
        LAYOUT: typeof layout.LAYOUT;
        Layout: typeof layout.Layout;
        VGroup: typeof layout.VGroup;
        HGroup: typeof layout.HGroup;
        Header: typeof layout.Header;
        Footer: typeof layout.Header;
        Sider: typeof layout.Sider;
        Content: typeof layout.Content;
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
declare module "ting/layout-flex" {
    import * as React from "react";
    import { VShrinkProps, ContentProps, SiderProps, LayoutProps } from "ting/layout";
    export class VShrink extends React.Component<VShrinkProps, {}> {
        static defaultProps: {
            className: string;
        };
        render(): JSX.Element;
    }
    export class VContent extends React.Component<ContentProps, {}> {
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
    }
    export class Sider extends React.Component<SiderProps, any> {
        static defaultProps: {
            className: string;
        };
        render(): JSX.Element;
    }
    export class HContent extends React.Component<ContentProps, any> {
        static defaultProps: {
            className: string;
        };
        render(): JSX.Element;
    }
    export class HGroup extends React.Component<LayoutProps, {}> {
        static defaultProps: {
            className: string;
        };
        render(): JSX.Element;
    }
}
