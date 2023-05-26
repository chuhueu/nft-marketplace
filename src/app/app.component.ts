import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    isLogged = localStorage.getItem('wagmi.connected') ?? '';
    constructor(
        private _router: Router
    )
    {}
}
