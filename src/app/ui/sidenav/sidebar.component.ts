import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NbMenuService, NbMenuItem, NbSearchService } from '@nebular/theme'
import { takeWhile } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private menuService : NbMenuService) { }
  private alive: boolean = true;
  selectedItem: string


  @Input()
  loggedIn: boolean

  searchTerm: string

  ngOnInit() {
  }


  menuItems: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/',
      icon: 'home-outline'
    },

    {
      title: 'About Us',
      icon: 'book-outline',
      link: '/about'
    },
    {
      title: 'Contact Us',
      icon: 'phone-outline',
      link: '/contact-us'
    },
    {
      title: 'Log In',
      icon: 'log-in-outline',
      link: '/auth/login'
    },
      {
      title: 'Sign Up',
      icon: 'person-add-outline',
      link: '/auth/register'
    }
]


loggedInMenuItems: NbMenuItem[] = [
  {
    title: 'Dashboard',
    link: 'dashboard',
    icon: 'settings'
  },
  {
    title: 'Home',
    link: 'home',
    icon: 'home'
  },
  {
    title: 'Log out',
    icon: 'log-out-outline'
  },{
    title: 'Resume check up',
    icon: 'file-text-outline',
    link: 'http://resume.io'
  }
]

  collapseAll () {
    this.menuService.collapseAll('menu')
  }

  navigateHome () {
    this.menuService.navigateHome('menu')
  }

  getSelectedItem () {
    this.menuService.getSelectedItem('menu')
      .pipe(takeWhile(() => this.alive))
      .subscribe((menuBag) => {
        this.selectedItem = menuBag.item.title
      })
  }

  ngOnDestroy() {
    this.alive = false
  }
}
