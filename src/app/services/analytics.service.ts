import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UpcomingInvoices} from "../interfaces/upcoming-invoices";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private endpoint = environment.BASE_URL

  constructor(
    private http: HttpClient
  ) { }

  getCollectionMetrics() {
    return this.http.get(`${this.endpoint}/collections`);
  }

  getInvoiceMetrics() {
    return this.http.get(`${this.endpoint}/invoices`);
  }

  getSignupMetrics() {
    return this.http.get(`${this.endpoint}/signups`);
  }

  getSignupChartMetrics() {
    return this.http.get<any[]>(`${this.endpoint}/signups`).pipe(
      map
      (signups => {
        const signupCounts = {
          primary: [0, 0, 0],
          secondary: [0, 0, 0],
          igcse: [0, 0, 0]
        };

        signups.forEach(signup => {
          if (signup.product === 'Zeraki Analytics') {
            if (signup.schoolType === 'primary') signupCounts.primary[0]++;
            if (signup.schoolType === 'secondary') signupCounts.secondary[0]++;
            if (signup.schoolType === 'igcse') signupCounts.igcse[0]++;
          } else if (signup.product === 'Zeraki Finance') {
            if (signup.schoolType === 'primary') signupCounts.primary[1]++;
            if (signup.schoolType === 'secondary') signupCounts.secondary[1]++;
            if (signup.schoolType === 'igcse') signupCounts.igcse[1]++;
          } else if (signup.product === 'Zeraki Timetable') {
            if (signup.schoolType === 'primary') signupCounts.primary[2]++;
            if (signup.schoolType === 'secondary') signupCounts.secondary[2]++;
            if (signup.schoolType === 'igcse') signupCounts.igcse[2]++;
          }
        });

        return signupCounts;
      })
    );
  }

  getSchoolMetrics() {
    return this.http.get(`${this.endpoint}/schools`);
  }

  getTargetMetrics() {
    return this.http.get(`${this.endpoint}/targets`);
  }

  getUpcomingInvoiceMetrics(): Observable<UpcomingInvoices> {
    return this.http.get<UpcomingInvoices>(`${this.endpoint}/upcoming-invoices`);
  }
}
