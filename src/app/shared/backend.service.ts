// The following is a sample implementation of a backend service using Progress Kinvey (https://www.progress.com/kinvey).
// Feel free to swap in your own service / APIs / etc here for your own apps.

import { Injectable } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";

Kinvey.init({
    apiHostname: 'CUSTDEP_HOST',
    micHostname: 'CUSTDEP_MIC_HOST',
    appKey: 'kid_rkqMGrzQE',
    appSecret: '173d80e3bc6e49a68a55b541cacb4b19'
})

export class BackendService {
    static isUserLoggedIn() {
        return !!Kinvey.User.getActiveUser();
    }
}