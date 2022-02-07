import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { User } from '@app/models/Identity/User';
import { UserUpdate } from '@app/models/Identity/UserUpdate';
import { environment } from '@environments/environment';
import { map, Observable, ReplaySubject, take } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User>(1);
  //Normalmente variáveis que são um subject possuem um $ no final
  public currentUser$ = this.currentUserSource.asObservable();

  baseUrl = environment.apiURL + 'api/account/'

  constructor(private http: HttpClient) { }

  public logarUser(model: any, rotaMetodo: string): Observable<void> {
    return this.http.post<User>(this.baseUrl + rotaMetodo, model, { headers: { skip: 'true' } })
      .pipe(
        take(1),
        map((response: User) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user)
          }
        })
      );
  }

  getUser(): Observable<UserUpdate> {
    return this.http.get<UserUpdate>(this.baseUrl + 'getUser').pipe(take(1));
  }

  updateUser(model: UserUpdate): Observable<void> {
    return this.http.put<UserUpdate>(this.baseUrl + 'updateUser', model).pipe(
      take(1),
      map((user: UserUpdate) => {
        this.setCurrentUser(user);
      }
      )
    )
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.currentUserSource.complete();
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
