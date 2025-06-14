import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  TuiAppearance,
  TuiBreakpointService,
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiIcon,
  TuiPopup,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiAvatar, TuiChip, TuiDrawer } from '@taiga-ui/kit';
import { TuiItemGroup } from '@taiga-ui/layout';
import { LocalStorageService } from '../services/localstorage.service';
import {
  dropMenuAvatarItems,
  headerItems,
  IDropMenuItem,
  IHeaderItem,
} from './layout.models';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    TuiTextfield,
    TuiIcon,
    TuiItemGroup,
    TuiChip,
    TuiAvatar,
    TuiAppearance,
    TuiPopup,
    TuiDrawer,
    TuiButton,
    FormsModule,
    RouterLink,
    AsyncPipe,
    RouterOutlet,
    TuiDropdown,
    TuiDataList,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private route = inject(Router);
  private lsService = inject(LocalStorageService);

  protected readonly openBgMenu = signal(false);
  protected readonly openDropMenuAvatar = signal(false);

  userName = this.lsService.getUser()?.name as string;

  breakpoint$ = inject(TuiBreakpointService);
  headerMenuItems: IHeaderItem[] = headerItems;
  dropMenuAvatarItems: IDropMenuItem[] = dropMenuAvatarItems;
  currentLink!: string;

  ngOnInit(): void {
    this.currentLink = this.route.url;
  }

  onClose(): void {
    this.openBgMenu.set(false);
  }

  onLogout(): void {
    this.lsService.deleteUser();
  }
}
