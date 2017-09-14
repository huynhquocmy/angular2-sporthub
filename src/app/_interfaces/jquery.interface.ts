export interface JQuery {
    countdown(str: string, callback: (event: any) => void): JQuery;
    tosrus(options: any): JQuery;
}

// // For methods on $
// interface JQueryStatic {
//     address: JQueryAddressStatic;
// }

// interface JQueryAddressStatic {
//     (): JQuery;
//     parameter(name: string): string;
//     parameter(name: string, value: string, append?: boolean): JQuery;
// }