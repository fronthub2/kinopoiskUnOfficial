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
  TuiIcon,
  TuiPopup,
  TuiTextfield
} from '@taiga-ui/core';
import { TuiAvatar, TuiChip, TuiDrawer } from '@taiga-ui/kit';
import { TuiItemGroup } from '@taiga-ui/layout';
import { headerItems, IHeaderItem } from './layout.models';

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
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private route = inject(Router);
  protected readonly open = signal(false);

  breakpoint$ = inject(TuiBreakpointService);
  items: IHeaderItem[] = headerItems;
  currentLink!:string;

  ngOnInit(): void {
    this.currentLink = this.route.url;
  }

  onClose(): void {
    this.open.set(false);
  }
}
