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