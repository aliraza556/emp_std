import { HttpWrapperService } from './_services/http-wrapper/http-wrapper.service';
import { AuthGuard } from './_routesGuard/auth.guard';
import { TeamService } from './_services/admin/team.service';
import { RegisterService } from './_services/register.service';
import { OrganizationService } from './_services/organization.service';
import { AllUsersComponent } from './_pages/admin/all-users/all-users.component';
import { HolidayPickerComponent } from './_pages/admin/holiday-picker/holiday-picker.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { Router } from './app.route';
import { AppComponent } from './app.component';
import { ConfigService } from './_services/config.service';
import { ErrorRegisterService } from './_services/error-register.service';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { LoginComponent } from './_pages/login/login.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { TopBarComponent } from './_pages/dashboard/topBar/topBar.component';
import { SettingComponent } from './_pages/dashboard/settings/setting.component';
import { ChangePasswordComponent } from './_pages/dashboard/user/change-password/change-password.component';
import { EditProfileComponent } from './_pages/dashboard/user/edit-profile/edit-profile.component';
import { LogoutComponent } from './_pages/dashboard/user/logout/logout.component';
import { NotificationComponent } from './_pages/dashboard/notification/notification.component';
import { MyDatePickerModule } from 'mydatepicker';
import { ApplicationStatsComponent } from './_pages/dashboard/dashboard-content/child/app-stats/app-stats.component';
import { DateRangeComponent } from './_pages/dashboard/dashboard-content/child/date-range/date-range.component';
import { WorkingHoursComponent } from './_pages/dashboard/dashboard-content/child/work-stats/working-hours.component';

// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RegisterComponent } from './_pages/register/register.component';
import { VerificationComponent } from './_pages/verification/verification.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { PageNotFoundComponent } from "app/_pages/PageNotFound/page-not-found.component";
import { TooltipModule } from "ng2-tooltip";

import { Timecard3Component } from './_pages/dashboard/timecard-3/timecard-3.component';
import * as decode from 'jwt-decode';
import { OrganizationComponent } from './_pages/organization/organization.component';
import { TeamComponent } from './_pages/team/team.component';
import { CreateTeamComponent } from './_pages/admin/create-team/create-team.component';

import { InviteMemberComponent } from './_pages/admin/invite-member/invite-member.component';

import { AdminSignupComponent } from './_pages/admin/admin-signup/admin-signup.component';
import { AdminDashboardComponent } from './_pages/admin/admin-dashboard/admin-dashboard.component';
import { UserSignupComponent } from './_pages/user-signup/user-signup.component';
import { UserService } from './_services/user/user.service';

import { ManagerComponent } from './_pages/manager/manager.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AdminService } from './_services/admin/admin.service';
import { Timecard2Component } from './_pages/dashboard/timecard-2/timecard-2.component';
import { PageNotFoundComponent } from './_pages/PageNotFound/page-not-found.component';
import { ResetPasswordComponent } from './_pages/reset-password/reset-password.component';
import { AddNewPasswordComponent } from './_pages/reset-password/add-new-password/add-new-password.component';
import { HomeComponent } from './_pages/home/home.component';
import { PricingComponent } from './_pages/pricing/pricing.component';
import { DashboardContent2Component } from './_pages/dashboard/dashboard-content-2/dashboard-content-2.component';
import { ActiveHoursChartComponent } from './_pages/dashboard/dashboard-content/child/activeHoursChart/active-hours-chart';

import { LandingPageComponent } from './_pages/landing-page/landing-page.component';

import { NotificationAlertsComponent } from './_pages/notification-alerts/notification-alerts.component';
declare var jquery: any; declare var $: any;

import { ScrollToModule } from 'ng2-scroll-to-el';
import { RecoverPasswordService } from './_services/recover-password.service';
import { AuthUserService } from './_routesGuard/auth-user.service';
import { NotLoginAuthGuard } from './_routesGuard/not-login-auth.guard';
import { MultiUserDashboardComponent } from './_pages/dashboard/multi-user-dashboard/multi-user-dashboard.component';
import { MultiUserDashboardService } from './_pages/dashboard/multi-user-dashboard/multi-user-dashboard.service';
import { MultiUserTimecardComponent } from './_pages/dashboard/multi-user-timecard/multi-user-timecard.component';
import { DashboardContentService } from './_services/dashboard-content.service';

import { AdminLoginRedirectGuard } from './_routesGuard/admin-login-redirect.guard';
import { MultiUserTimecardService } from './_pages/dashboard/multi-user-timecard/multi-user-timecard.service';
import { TeamSettingsComponent } from './_pages/admin/team-settings/team-settings.component';
import { TeamDetailsComponent } from './_pages/team-details/team-details.component';
import { UserDashboardDetailsComponent } from './_pages/dashboard/user-dashboard-details/user-dashboard-details.component';

import { DownloadTrackerComponent } from './_pages/download-tracker/download-tracker.component';
import { DownloadTrackerService } from './_pages/download-tracker/download-tracker.service';

import { BillingComponent } from './_pages/admin/billing/billing.component';
import { BillingDetailsComponent } from './_pages/admin/billing/billing-details/billing-details.component';
import { AuditLogComponent } from './_pages/admin/billing/audit-log/audit-log.component';

import { BillingSettingsComponent } from './_pages/admin/billing/billing-settings/billing-settings.component';
import { BillingService } from './_pages/admin/billing/billing.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MembersListComponent } from './_pages/members-list/members-list.component';
import { PendingMembersListComponent } from './_pages/pending-members-list/pending-members-list.component';
import { ReversePipe } from './_pipes/reverse.pipe';
import { SuperAdminComponent } from './_pages/super-admin/super-admin.component';
import { OrganizationListComponent } from './_pages/super-admin/organization-list/organization-list.component';
import { AddOrganizationComponent } from './_pages/super-admin/add-organization/add-organization.component';
import { SuperAdminService } from './_pages/super-admin/super-admin.service';
import { SuperAdminDashbaordComponent } from './_pages/super-admin/super-admin-dashbaord/super-admin-dashbaord.component';
import { OrganizationMembersComponent } from './_pages/super-admin/super-admin-dashbaord/organization-members/organization-members.component';
import { OrganizationTeamsComponent } from './_pages/super-admin/super-admin-dashbaord/organization-teams/organization-teams.component';
import { AppRoutingModule } from './app-routing.module'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    VerificationComponent,
    RegisterComponent,
    TopBarComponent,
    SettingComponent,
    LogoutComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    DateRangeComponent,
    WorkingHoursComponent,
    ApplicationStatsComponent,
    NotificationComponent,
    Timecard2Component,
    PageNotFoundComponent,
    ResetPasswordComponent,
    AddNewPasswordComponent,
    HomeComponent,
    PricingComponent,
    Timecard3Component,
    DashboardContent2Component,
    ActiveHoursChartComponent,
    HolidayPickerComponent,
    AllUsersComponent,
    OrganizationComponent,
    TeamComponent,
    AdminSignupComponent,
    CreateTeamComponent,
    InviteMemberComponent,
    AdminDashboardComponent,
    UserSignupComponent,
    ManagerComponent,
    LandingPageComponent,
    NotificationAlertsComponent,
    MultiUserDashboardComponent,
    MultiUserTimecardComponent,
    TeamSettingsComponent, TeamDetailsComponent,
    UserDashboardDetailsComponent, DownloadTrackerComponent,
    BillingComponent, BillingDetailsComponent, AuditLogComponent, BillingSettingsComponent,

    MembersListComponent,
    PendingMembersListComponent,
    ReversePipe,
    SuperAdminComponent,
    OrganizationListComponent,
    AddOrganizationComponent,
    SuperAdminDashbaordComponent,
    OrganizationMembersComponent,
    OrganizationTeamsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    MyDateRangePickerModule,
    MyDatePickerModule,
    TooltipModule,
    ButtonsModule.forRoot(),
    ScrollToModule.forRoot(),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule,
    AppRoutingModule
  ],

  providers: [MultiUserTimecardService, AdminLoginRedirectGuard, DashboardContentService, MultiUserDashboardService,
    NotLoginAuthGuard, AuthGuard, AuthUserService, RecoverPasswordService,
    UserService, AdminService, TeamService, RegisterService, ConfigService,
    OrganizationService, ErrorRegisterService,
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
   HttpWrapperService, DownloadTrackerService,
    BillingService,SuperAdminService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
