import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './request.interceptor';
import { InitService } from './init.service';
import { RouteConfigToken } from './services/routeConfig.service';
import { GlobalErrorHandler } from './errorhandler.service';

function initFactory(initService:InitService){
  return ()=>initService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG
    },
    {
      provide:RouteConfigToken,
      useValue:{title:'Home'},
    },
    {
      provide:APP_INITIALIZER,
      useFactory:initFactory,
      deps:[InitService],
      multi:true
    },
    {
      provide:ErrorHandler,
      useClass:GlobalErrorHandler
    }
  ]
};
