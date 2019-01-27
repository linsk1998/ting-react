declare module "anu"{
    export namespace eventSystem {
        function addEvent(ele:HTMLElement|Window,event:string,callback:Function,capture?:boolean);
    }
}