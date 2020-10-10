import { Component, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { AdminService } from '../services/admin-service.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  //@ViewChild('viewContainer') viewContainer: ViewContainerRef;
  //@ViewChild('screamOfWar') screamOfWar: TemplateRef<any>;
  constructor(private adminService: AdminService) {
    
  } 
  ngAfterViewInit() {
    //let view = this.screamOfWar.createEmbeddedView(null);
    //this.viewContainer.insert(view);
  }
  ngOnInit(): void {
        //$(document).on('click', '.dropdown-menu', function (e) {
        //  e.stopPropagation();
        //});

        //// make it as accordion for smaller screens
        //if ($(window).width() < 992) {
        //  $('.dropdown-menu a').click(function (e) {
        //    e.preventDefault();
        //    if ($(this).next('.submenu').length) {
        //      $(this).next('.submenu').toggle();
        //    }
        //    $('.dropdown').on('hide.bs.dropdown', function () {
        //      $(this).find('.submenu').hide();
        //    })
        //  });
        //}
     
    this.adminService.getCategories().subscribe(
      response => {
        console.log(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].subMenu) {
            
            const a = document.createElement("a");
            a.href = "#";
            a.innerHTML = response[i].name + " »";
            a.className = "dropdown-item";
            
            const li = document.createElement("li");
            li.setAttribute("_ngcontent-ng-cli-universal-c59", "")
            const ul = document.createElement("ul");
            ul.setAttribute("_ngcontent-ng-cli-universal-c59","")
            ul.className = "submenu dropdown-menu " + response[i].identifier;
            li.appendChild(a);
            li.appendChild(ul);
            if (response[i].level === 0) {
              const ul = <HTMLElement><unknown>document.getElementById("dropdown-menu first");
              ul.appendChild(li);
            }
            //buscamos los anteriores del array puesto que uno de ellas sera la sublista
            for (let j = 0; j < i; j++) {
              if (response[j].identifier == response[i].parent_Identifier) {
                //let li = document.createElement("li");
                //a.href = "#";
                //a.innerHTML = response[i].name;
                console.log(response[i].name);
                const ul = <HTMLElement><unknown>document.getElementsByClassName("submenu dropdown-menu " + response[j].identifier);
                //li.appendChild(a);
                ul[0].appendChild(li);
              }
            }
          }
          if (!response[i].subMenu) {
            const a = document.createElement("a");
            a.href = "#";
            a.innerHTML = response[i].name;
            a.className = "dropdown-item";

            const li = document.createElement("li");
            li.appendChild(a);

            if (response[i].level === 0) {
              const ul = <HTMLElement><unknown>document.getElementById("dropdown-menu first");
              ul.appendChild(li);
            }
            for (let j = 0; j < i; j++) {
              if (response[j].identifier == response[i].parent_Identifier) {
                //let li = document.createElement("li");
                //a.href = "#";
                //a.innerHTML = response[i].name;
                console.log(response[i].name);
                let ul = <HTMLElement><unknown>document.getElementsByClassName("submenu dropdown-menu " + response[j].identifier);
                //li.appendChild(a);
                ul[0].appendChild(li);
              }
            }

          }
           

             


        }

        $(document).on('click', '.dropdown-menu', function (e) {
          e.stopPropagation();
        });

        // make it as accordion for smaller screens
        if ($(window).width() < 992) {
          $('.dropdown-menu a').click(function (e) {
            e.preventDefault();
            if ($(this).next('.submenu').length) {
              $(this).next('.submenu').toggle();
            }
            $('.dropdown').on('hide.bs.dropdown', function () {
              $(this).find('.submenu').hide();
            })
          });
        }

      },
      error => { console.log("error al obtener categorías"); }
    );
    
  }
  
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
