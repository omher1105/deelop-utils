export interface ResponseData {
    status: number;
    data?: string;
    urlZip?: string;
    urlZipFrontEnd?: string;
    urlZipBackEnd?: string;
    urlOpenFrontEnd?: string;
    urlOpenBackEnd?: string;
    tutorial?: RESPONSETUTORIAL;
}
export interface ResponseFunctionGeneral {
    response: boolean;
    data?: string;
}

export interface RESPONSETUTORIAL {
    steps: string[];
    commands?: string[];
    url_video?: string;
}
