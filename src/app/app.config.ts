import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import routes from "./app-routing.module";
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideIcons } from '@ng-icons/core';
import { radixDashboard } from '@ng-icons/radix-icons';
import { lucideHome, lucideSchool } from '@ng-icons/lucide';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {provideHttpClient, withFetch} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers:
    [provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideIcons({ radixDashboard, lucideSchool, lucideHome }),
      BaseChartDirective,
      BrowserModule,
      provideHttpClient(withFetch())
    ]
};
