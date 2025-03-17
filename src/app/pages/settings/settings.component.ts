import { Component } from '@angular/core';
import { AlertConfigComponent } from "../../components/settings/alert-config/alert-config.component";
import { ProfileConfigComponent } from "../../components/settings/profile-config/profile-config.component";

@Component({
  selector: 'app-settings',
  imports: [AlertConfigComponent, ProfileConfigComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
