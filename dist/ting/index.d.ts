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
    export interface IProps {
        path?: string;
        location?: string;
        component?: React.ComponentType<any>;
        require?: string;
        export?: string;
    }
    export interface IStates {
        currentPath?: string;
        component?: React.ComponentType<any>;
    }
    export class Route extends Component<IProps, IStates> {
        private location;
        private isLoading;
        constructor(props: IProps, context: any);
        componentWillUnmount(): void;
        componentWillMount(): void;
        render(): {};
        checkChild(children: any, location: any): void;
    }
    export class Link extends Component<{
        to: string;
    }, any> {
        render(): JSX.Element;
    }
    export function navigate(path: any): void;
    export function linkClickHandle(e: any): void;
}
declare module "ting" {
    import * as button from "ting/button";
    import * as icon from "ting/icon";
    import * as loader from "ting/router";
    const _default: {
        navigate(path: any): void;
        linkClickHandle(e: any): void;
        Route: typeof loader.Route;
        Link: typeof loader.Link;
        Icon: typeof icon.Icon;
        Button: typeof button.Button;
        ButtonGroup: typeof button.ButtonGroup;
        ButtonToolbar: typeof button.ButtonToolbar;
    };
    export = _default;
}
