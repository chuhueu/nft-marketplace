import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

export type SupportedExtensions =
    | 'pdf'
    | 'png'
    | 'xlsx'
    | 'xls'
    | 'docx'
    | 'doc'
    | 'txt'
    | 'csv'
    | 'json'
    | 'xml';

export interface ExportAsConfig {
    type: SupportedExtensions;
    elementIdOrContent: string;
    download?: boolean;
    fileName?: string;
    options?: any;
}

@Injectable({
    providedIn: 'root',
})
export class ExportAsService {
    constructor() {}

    /**
     * Main base64 get method, it will return the file as base64 string
     * @param config your config
     */
    get(config: ExportAsConfig): Observable<string | null> {
        // structure method name dynamically by type
        const func = 'get' + config.type.toUpperCase();
        // if type supported execute and return
        if (this[func]) {
            return this[func](config);
        }

        // throw error for unsupported formats
        return new Observable((observer) => {
            observer.error('Export type is not supported.');
        });
    }

    /**
     * Save exported file in old javascript way
     * @param config your custom config
     * @param fileName Name of the file to be saved as
     */
    save(config: ExportAsConfig, fileName: string): Observable<string | null> {
        // set download
        config.download = true;
        // get file name with type
        config.fileName = fileName + '.' + config.type;
        return this.get(config);
    }

    getCSV(config: ExportAsConfig): Observable<string | null> {
        return new Observable((observer) => {
            const element: HTMLElement = document.getElementById(
                config.elementIdOrContent
            );
            const lastElementChild = element.lastElementChild;
            element.removeChild(element.lastElementChild);
            const csv = [];
            const rows: any = element.querySelectorAll('table tr');
            for (let index = 0; index < rows.length; index++) {
                const rowElement = rows[index];
                const row = [];
                const cols = rowElement.querySelectorAll('td, th');
                for (let colIndex = 0; colIndex < cols.length; colIndex++) {
                    const col = cols[colIndex];
                    row.push('"' + col.innerText + '"');
                }
                csv.push(row.join(','));
            }
            const csvContent =
                'data:text/csv;base64,' + this.btoa(csv.join('\n'));
            if (config.download) {
                this.downloadFromDataURL(config.fileName, csvContent);
                element.appendChild(lastElementChild);
                observer.next();
            } else {
                observer.next(csvContent);
            }
            observer.complete();
        });
    }

    getXLSX(config: ExportAsConfig): Observable<string | null> {
        return new Observable((observer) => {
            const element: HTMLElement = document.getElementById(
                config.elementIdOrContent
            );
            const ws3 = XLSX.utils.table_to_sheet(element, config.options);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws3, config.fileName);
            const out = XLSX.write(wb, { type: 'base64' });
            const xlsContent =
                'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
                out;
            if (config.download) {
                this.downloadFromDataURL(config.fileName, xlsContent);
                observer.next();
            } else {
                observer.next(xlsContent);
            }
            observer.complete();
        });
    }

    /**
     * create downloadable file from dataURL
     * @param fileName downloadable file name
     * @param dataURL file content as dataURL
     */
    downloadFromDataURL(fileName: string, dataURL: string): void {
        // create blob
        this.contentToBlob(dataURL).subscribe((blob) => {
            // download the blob
            this.downloadFromBlob(blob, fileName);
        });
    }

    contentToBlob(content: string): Observable<Blob> {
        return new Observable((observer) => {
            // get content string and extract mime type
            const arr = content.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            observer.next(new Blob([u8arr], { type: mime }));
            observer.complete();
        });
    }

    downloadFromBlob(blob: Blob, fileName: string) {
        // get object url
        const url = window.URL.createObjectURL(blob);
        // check for microsoft internet explorer
        if (window.navigator && window.navigator['msSaveOrOpenBlob']) {
            // use IE download or open if the user using IE
            window.navigator['msSaveOrOpenBlob'](blob, fileName);
        } else {
            this.saveFile(fileName, url);
        }
    }

    saveFile(fileName: string, url: string) {
        // if not using IE then create link element
        const element = document.createElement('a');
        // set download attr with file name
        element.setAttribute('download', fileName);
        // set the element as hidden
        element.style.display = 'none';
        // append the body
        document.body.appendChild(element);
        // set href attr
        element.href = url;
        // click on it to start downloading
        element.click();
        // remove the link from the dom
        document.body.removeChild(element);
    }

    btoa(content: string) {
        return btoa(unescape(encodeURIComponent(content)));
    }
}
