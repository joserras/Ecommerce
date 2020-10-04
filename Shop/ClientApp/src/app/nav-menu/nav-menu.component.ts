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

    $(document).ready(function() {
        $('.dropdown-submenu a.test').on("click", function (e) {
          $(this).next('ul').toggle();
          e.stopPropagation();
          e.preventDefault();
        });
    });
    
    this.adminService.getCategories().subscribe(
      response => {
        console.log(response);

        for (let i = 0; i < response.length; i++) {
          if (response[i].subMenu) {
            const span = document.createElement("span");
            span.className = "caret";
            let a = document.createElement("a");
            a.href = "#";
            a.innerHTML = response[i].name;
            a.tabIndex = -1;
            a.appendChild(span);
            let li = document.createElement("li");
            li.className = "dropdown-submenu";
            let ul = document.createElement("ul");
            ul.className = "dropdown-menu " + response[i].identifier;
            li.appendChild(a);
            li.appendChild(ul);
            if (response[i].level == 0) {
              let ul = <HTMLElement><unknown>document.getElementById("ul 0");
              ul.appendChild(li);
            }
            //buscamos los anteriores del array puesto que uno de ellas sera la sublista
            for (let j = 0; j < i; j++) {
              if (response[j].identifier == response[i].parent_Identifier) {
                //let li = document.createElement("li");
                //a.href = "#";
                //a.innerHTML = response[i].name;
                console.log(response[i].name);
                let ul = <HTMLElement><unknown>document.getElementsByClassName("dropdown-menu " + response[j].identifier);
                //li.appendChild(a);
                ul[0].appendChild(li);
              }
            }
          }
          if (!response[i].subMenu) {
            let a = document.createElement("a");
            a.href = "#";
            a.innerHTML = response[i].name;
            let li = document.createElement("li");

            li.appendChild(a);
            if (response[i].level == 0) {
              let ul = <HTMLElement><unknown>document.getElementById("ul 0");
              ul.appendChild(li);
            }
            for (let j = 0; j < i; j++) {
              if (response[j].identifier == response[i].parent_Identifier) {
                //let li = document.createElement("li");
                //a.href = "#";
                //a.innerHTML = response[i].name;
                console.log(response[i].name);
                let ul = <HTMLElement><unknown>document.getElementsByClassName("dropdown-menu " + response[j].identifier);
                //li.appendChild(a);
                ul[0].appendChild(li);
              }
            }

          }

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
