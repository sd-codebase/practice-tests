import { Injectable } from '@angular/core';
import { HttpService } from '@components/http.service';
import { StorageService } from '@components/storage.serice';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { LoaderService } from '@components/loader.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        private http: HttpService,
        private storageService: StorageService,
        private notificationService: NotificationService,
        private loaderService: LoaderService,
    ) { }

    async login(userDetails) {
        try {
            const userLogin = await this.http.post('/users/authenticate', userDetails).toPromise() as ILoginResponse;
            if (userLogin.token && userLogin.savedUser) {
                this.storageService.setToken(userLogin.token);
                this.storageService.setUser(userLogin.savedUser);
                this.notificationService.show(ENotification.SUCCESS, 'Logged In', 'Login successful');
                return userLogin.savedUser;
            }
        } catch (e) {
            this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
            this.loaderService.hide();
        } finally {
        }
        return false;
    }

    async signUp(userDetails) {
        try {
            await this.loaderService.show();
            const userSignUp = await this.http.post('/users', userDetails).toPromise();
            if (userSignUp) {
                this.notificationService.show(ENotification.SUCCESS, 'Sign Up', 'Sign up successful, Please login');
            }
        } catch (e) {
            this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
        } finally {
            this.loaderService.hide();
        }
    }

    logout() {
        this.storageService.clear();
        location.reload();
    }

    public isAuthenticated(): boolean {
        return !!this.storageService.getToken();
    }
}

export interface ILoginResponse {
    token: string;
    savedUser: IUser;
}

export interface IUser {
    _id?: string;
    email: string;
    contact?: string;
    password?: string;
    name?: string;
    courses?: string[];
    role?: EUserRole;
    enabled?: boolean;
    isEditMode?: boolean;
    belongsTo?: string;
}

export enum EUserRole {
    GUEST,
    INSTRUCTOR,
    USER,
    ADMIN,
}
