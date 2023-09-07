import { URLSearchParams } from "url";

export type RequestUrl = {
  nextUrl: {
    pathname:string,
    searchParams:QuerySearchParams
  }
}

export type QuerySearchParams = {
  get: URLSearchParams,
  start?:string|number,
  stop?:string|number,
  first?:boolean,
  last?:boolean,
}

export type OrganizedData = {
  duplicati_id: string;
  times: {
    _time: string;
    items: any[];
  }[];
}

export type Duplicati = {
  Data: {
    SizeOfAddedFiles:number,
    FilesWithError:number,
    SizeOfModifiedFiles:number,
    SizeOfExaminedFiles:number,
    SizeOfOpenedFiles:number,
    
    CompactResults: {
      UploadedFileCount:number,
      DownloadedFileCount:number,
      DownloadedFileSize:number,
      UploadedFileSize:number,
    },
    Duration:string,
    ParsedResult:string,

    BackendStatistics: {
      BytesUploaded:number,
      BytesDownloaded:number,
      FilesUploaded:number,
      FilesDownloaded:number,

    }
  },
  Extra:{
    OperationName:string,
    "backup-name":string,
  }
}

export type InfluxPoint = {
  result: string,
  table: number,
  _start: string,
  _stop:string, 
  _time: string,
  _value: string,
  _field: string|number,
  _measurement: string,
  duplicati_id: string,
}