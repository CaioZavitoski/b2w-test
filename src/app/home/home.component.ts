import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  oldUserData: any = [];
  followingUsers: any = [];
  followingNumber: any;
  isFollowing: boolean;
  constructor(public http: HttpClient) {}

  userFullName: any;
  userCity: any;
  userBornAt: any;
  userAge: any;
  userPhone: any;
  userEmail: any;
  hasFollowing = false;

  destroy$ = new Subject();
  userData: any;
  userBackgroundImage: any;

  ngOnInit(): void {
    this.getUserData();
    this.showUserData();
  }

  ngOnDestroy() {
    this.destroy$.complete();
    this.destroy$.next();
  }

  getUserData(): Observable<any> {
    return this.http.get('https://randomuser.me/api/');
  }

  showUserData() {
    this.getUserData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.userData = data;
        this.userBackgroundImage = this.userData.results[0].picture.large;
        this.userFullName = this.userData.results[0].name.first.concat(
          ' ',
          this.userData.results[0].name.last
        );
        this.userCity = this.userData.results[0].location.city.concat(
          ', ',
          this.userData.results[0].location.country
        );
        this.userBornAt = this.userData.results[0].nat;
        this.userAge = this.userData.results[0].dob.age;
        this.userEmail = this.userData.results[0].email;
        this.userPhone = this.userData.results[0].cell;
      });
  }

  onTryNewUser() {
    this.isFollowing = false;
    this.showUserData();
    this.oldUserData.push(this.userData);
  }

  onFollowUser() {
    this.hasFollowing = true;
    this.followingUsers.push(this.userData);
    this.followingNumber = this.followingUsers.length;
    this.isFollowing = true;
  }
}
