import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { getDefaultProvider } from 'ethers';
import {
  createClient,
  connect,
  disconnect,
  getAccount,
  signMessage,
  InjectedConnector,
} from '@wagmi/core';
import { environment } from 'environments/environment';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class UserComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    user: User;
    isLoggedIn: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _userService: UserService,
        private _toastrService: ToastrService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        createClient({
            autoConnect: true,
            provider: getDefaultProvider(),
        });

        const { isConnected } = getAccount();
        this.isLoggedIn = isConnected;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void
    {
        // Return if user is not available
        if ( !this.user )
        {
            return;
        }

        // Update the user
        this._userService.update({
            ...this.user,
            status
        }).subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void
    {
        this._userService.signOut().subscribe();
        disconnect();
        this.isLoggedIn = false;
        localStorage.clear();
        this._toastrService.success('Bạn đã đăng xuất');
    }

    async handleAuth(): Promise<any> {
        const { isConnected } = getAccount();

        if (isConnected) {
            await disconnect();
        } //disconnects the web3 provider if it's already active

        const provider = await connect({ connector: new InjectedConnector() }); // enabling the web3 provider metamask

        const userData = {
          address: provider.account,
          chain: provider.chain.id,
          network: 'evm',
        };

        const { data } = await axios.post(
            `${environment.apiUrl}/request-message`,
            userData
        );

        const message = data.message;

        const signature = await signMessage({ message });

        const result = await axios.post(
            `${environment.apiUrl}/verify`,
            {
                message,
                signature,
            },
            { withCredentials: true } // set cookie from Express server
        );

        if (result) {
            this.isLoggedIn = true;
            this._toastrService.success('Bạn đã đăng nhập thành công');
            this._changeDetectorRef.markForCheck();
        }
    }
}
