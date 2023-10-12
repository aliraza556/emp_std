import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingPageComponent} from './_pages/landing-page/landing-page.component';
import {PricingComponent} from './_pages/pricing/pricing.component';
import {LoginComponent} from './_pages/login/login.component';
import {RegisterComponent} from './_pages/register/register.component';
import {UserSignupComponent} from './_pages/user-signup/user-signup.component';
import {AdminSignupComponent} from './_pages/admin/admin-signup/admin-signup.component';
import {VerificationComponent} from './_pages/verification/verification.component';
import {LogoutComponent} from './_pages/dashboard/user/logout/logout.component';
import {DateRangeComponent} from './_pages/dashboard/dashboard-content/child/date-range/date-range.component';
import {ResetPasswordComponent} from './_pages/reset-password/reset-password.component';
import {AddNewPasswordComponent} from './_pages/reset-password/add-new-password/add-new-password.component';
import {DashboardComponent} from './_pages/dashboard/dashboard.component';
import {AuthGuard} from './_routesGuard/auth.guard';
import {DashboardContent2Component} from './_pages/dashboard/dashboard-content-2/dashboard-content-2.component';
import {SuperAdminDashbaordComponent} from './_pages/super-admin/super-admin-dashbaord/super-admin-dashbaord.component';
import {OrganizationMembersComponent} from './_pages/super-admin/super-admin-dashbaord/organization-members/organization-members.component';
import {OrganizationTeamsComponent} from './_pages/super-admin/super-admin-dashbaord/organization-teams/organization-teams.component';
import {SuperAdminComponent} from './_pages/super-admin/super-admin.component';
import {OrganizationListComponent} from './_pages/super-admin/organization-list/organization-list.component';
import {AddOrganizationComponent} from './_pages/super-admin/add-organization/add-organization.component';
import {AdminDashboardComponent} from './_pages/admin/admin-dashboard/admin-dashboard.component';
import {MembersListComponent} from './_pages/members-list/members-list.component';
import {TeamComponent} from './_pages/team/team.component';
import {PendingMembersListComponent} from './_pages/pending-members-list/pending-members-list.component';
import {InviteMemberComponent} from './_pages/admin/invite-member/invite-member.component';
import {BillingComponent} from './_pages/admin/billing/billing.component';
import {BillingDetailsComponent} from './_pages/admin/billing/billing-details/billing-details.component';
import {AuditLogComponent} from './_pages/admin/billing/audit-log/audit-log.component';
import {OrganizationComponent} from './_pages/organization/organization.component';
import {DownloadTrackerComponent} from './_pages/download-tracker/download-tracker.component';
import {ManagerComponent} from './_pages/manager/manager.component';
import {TeamDetailsComponent} from './_pages/team-details/team-details.component';
import {UserDashboardDetailsComponent} from './_pages/dashboard/user-dashboard-details/user-dashboard-details.component';
import {MultiUserDashboardComponent} from './_pages/dashboard/multi-user-dashboard/multi-user-dashboard.component';
import {MultiUserTimecardComponent} from './_pages/dashboard/multi-user-timecard/multi-user-timecard.component';
import {SettingComponent} from './_pages/dashboard/settings/setting.component';
import {NotificationComponent} from './_pages/dashboard/notification/notification.component';
import {EditProfileComponent} from './_pages/dashboard/user/edit-profile/edit-profile.component';
import {Timecard2Component} from './_pages/dashboard/timecard-2/timecard-2.component';
import {ChangePasswordComponent} from './_pages/dashboard/user/change-password/change-password.component';
import {WorkingHoursComponent} from './_pages/dashboard/dashboard-content/child/work-stats/working-hours.component';
import {AllUsersComponent} from './_pages/admin/all-users/all-users.component';
import {HolidayPickerComponent} from './_pages/admin/holiday-picker/holiday-picker.component';
import {CreateTeamComponent} from './_pages/admin/create-team/create-team.component';
import {PageNotFoundComponent} from './_pages/PageNotFound/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'landing', component: LandingPageComponent,
    // canActivate: [NotLoginAuthGuard],

  },
  // { path: 'home', component: HomeComponent },


  { path: 'pricing', component: PricingComponent },
  {
    path: 'login', component: LoginComponent,

  },
  {
    path: 'register', component: RegisterComponent,

  },
  {
    path: 'user-signup', component: UserSignupComponent,

  },
  {
    path: 'admin-signup', component: AdminSignupComponent,

  },
  {
    path: 'verification', component: VerificationComponent,

  },
  {
    path: 'logout', component: LogoutComponent,

  },
  { path: 'date-rabge', component: DateRangeComponent },
  {
    path: 'reset-password', component: ResetPasswordComponent,

  },
  {
    path: 'passwd/reset', component: AddNewPasswordComponent,

  },

  {
    path: 'timecards',
    redirectTo: 'dashboard/timecard',
    pathMatch: 'full'
  },
  {
    path: 'notification',
    redirectTo: 'dashboard/notification',
    pathMatch: 'full'
  },

  {
    path: 'edit-profile',
    redirectTo: 'dashboard/edit-profile',
    pathMatch: 'full'
  },

  {
    path: 'change-password',
    redirectTo: 'dashboard/change-password',
    pathMatch: 'full'
  },

  // {
  //     path: 'admin/team',
  //     redirectTo: 'dashboard/team',
  //     pathMatch: 'full'

  // },

  {
    path: 'admin/pendingUsers',
    redirectTo: 'dashboard/pendingUsers',
    pathMatch: 'full'

  },
  // {
  //     path: 'admin/billing',
  //     redirectTo: 'dashboard/billing',
  //     pathMatch: 'full'

  // },
  {
    path: 'admin/teamDetails/:id',
    redirectTo: 'dashboard/teamDetails/:id',
    pathMatch: 'full'

  },
  {
    path: 'admin/userDetails/:id',
    redirectTo: 'dashboard/userDetails/:id',
    pathMatch: 'full'

  },


  /*here we are going to set child routes for dashboard related component */
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: '',
        component: DashboardContent2Component
      },
      {
        path: 'details/:id', component: SuperAdminDashbaordComponent,
        children: [
          { path: '', redirectTo: 'organization-members', pathMatch: 'full' },
          { path: 'organization-members', component: OrganizationMembersComponent },
          { path: 'organizations-team', component: OrganizationTeamsComponent }
        ]
      },

      {
        path: 'super-admin', component: SuperAdminComponent,
        children: [

          { path: '', redirectTo: 'organizations-list', pathMatch: 'full' },
          { path: 'organizations-list', component: OrganizationListComponent },
          { path: 'add-organization', component: AddOrganizationComponent },



        ]

      },

      {
        path: 'admin-dashboard', component: AdminDashboardComponent,
        // canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'members', pathMatch: 'full' },
          { path: 'members', component: MembersListComponent },
          { path: 'teams', component: TeamComponent },
          // { path: 'organization-setting', component: OrganizationComponent },
          { path: 'pendingUsers', component: PendingMembersListComponent },
          { path: 'inviteUser', component: InviteMemberComponent }
        ]
      },
      {
        path: 'billing',
        component: BillingComponent,
        children: [
          { path: '', redirectTo: 'billing-details', pathMatch: 'full' },
          { path: 'billing-details', component: BillingDetailsComponent },
          { path: 'audit-log', component: AuditLogComponent },
          // { path: 'settings', component: BillingSettingsComponent },
          { path: 'settings', component: OrganizationComponent },

        ]
      },

      { path: 'download-tracker', component: DownloadTrackerComponent },


      // {
      //     path: 'admin/members', component: AdminDashboardComponent,
      //     // canActivate: [AuthGuard],
      // },

      { path: 'manager-dashboard', component: ManagerComponent },
      {
        path: 'orgProfile',
        component: OrganizationComponent
      },

      {
        path: 'pendingUsers',
        component: PendingMembersListComponent
      },


      // {
      //     path: 'team',
      //     component: TeamComponent
      // },
      {
        path: 'teamDetails/:id',
        component: TeamDetailsComponent
      },
      {
        path: 'userDetails/:id',
        component: UserDashboardDetailsComponent,
        children: [
          {
            path: '', redirectTo: 'dashboard', pathMatch: 'full'
          },
          {
            path: 'dashboard', component: MultiUserDashboardComponent
          },
          {
            path: 'timecards', component: MultiUserTimecardComponent
          },
          {
            path:'productivity-settings',component:SettingComponent
          }

        ]
      },


      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'dashboard',
        component: DashboardContent2Component
      },
      {
        path: 'dashboard-content',
        component: DashboardContent2Component
      }
      ,
      {
        path: 'dashboard-content-2',
        component: DashboardContent2Component
      }
      ,
      {
        path: 'edit-profile',
        component: EditProfileComponent
      }

      ,
      {
        path: 'timecard',
        component: Timecard2Component
      }
      // ,
      // {
      //     path: 'timecard-3',
      //     component: Timecard3Component
      // }

      ,
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
      ,
      {
        path: 'working-hours',
        component: WorkingHoursComponent
      }
      ,
      {
        path: 'setting',
        component: SettingComponent
      }
      ,
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'all-users',
        component: AllUsersComponent

      },
      {
        path: 'holiday-picker',
        component: HolidayPickerComponent

      },

      {
        path: 'create-team',
        component: CreateTeamComponent

      },
      // {
      //     path: 'invite-member',
      //     component: InviteMemberComponent

      // },

      // {
      //     path: '**', component: PageNotFoundComponent,
      //     canActivate: [AdminLoginRedirectGuard]
      // }


    ]
  },

  {
    path: '**', component: PageNotFoundComponent,
    // canActivate: [AdminLoginRedirectGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
