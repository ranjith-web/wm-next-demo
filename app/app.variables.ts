import React from 'react';
import { ModelVariable  } from '@wavemaker/react-runtime/variables/model-variable';
import { ServiceVariable } from '@wavemaker/react-runtime/variables/service-variable';
import { NavigationAction  } from '@wavemaker/react-runtime/actions/navigation-action';
import {TimerAction} from '@wavemaker/react-runtime/actions/timer-action'
import {NotificationAction} from '@wavemaker/react-runtime/actions/notification-action'
import { LoginAction  } from '@wavemaker/react-runtime/actions/login-action';
import { LogoutAction  } from '@wavemaker/react-runtime/actions/logout-action';


export default (App:any) => {
    return {
        Variables : {
            supportedLocale: new (ModelVariable as any)({
                name: 'supportedLocale',
                _context: App,
                paramProvider: () => (
                        {"en":"English"}
                ),

            }),
        },
        Actions : {
            appNotification: new (NotificationAction as any)({
                name: 'appNotification',
                _context: App,
                operation: "toast",
                paramProvider: () => (
                    {
                        'class': "Error",
                        'toasterPosition': "bottom right",
                    }
                ),
                onOk: (variable, data, options) => {
                    
                },
                 toasterService: () => App.appConfig.currentPage.toaster,
                onClose: (variable, data, options) => {
                    
                },

            }),
            goToPage_Main: new (NavigationAction as any)({
                name: 'goToPage_Main',
                _context: App,
                operation: "gotoPage",
                paramProvider: () => (
                    {
                        'pageName': "Main",
                    }
                ),
                appConfig: App.appConfig,

            }),
            goToPage_pendingorders: new (NavigationAction as any)({
                name: 'goToPage_pendingorders',
                _context: App,
                operation: "gotoPage",
                paramProvider: () => (
                    {
                        'pageName': "pendingorders",
                    }
                ),
                appConfig: App.appConfig,

            }),
        },
    };
};
