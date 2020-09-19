import { Component } from '@angular/core';
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
  constructor(private adminService: AdminService) {
    
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
        var a = response;
        for (var i = 0; i < response.length; i++) {
          if (response[i].submenu) {
            let a = document.createElement("a");
            a.href = "#";
            a.innerHTML = response[i].name;
            let li = document.createElement("li");
            li.className = "dropdown-submenu";
            let ul = document.createElement("ul");
            ul.className = "dropdown-menu " + response[i].identifier;
            li.appendChild(a);
            li.appendChild(ul);
            //buscamos los anteriores del array puesto que uno de ellas sera la sublista
            for (let j = 0; j < i; j++) {
              if (response[j].identifier == response[i].parent_Identifier) {
                let li = document.createElement("li");
                a.href = "#";
                a.innerHTML = response[i].name;
                let ul = <HTMLElement><unknown>document.getElementsByClassName("dropdown-menu " + response[j].identifier);
                li.appendChild(a);
                ul.appendChild(li);
              }
            }
          }
          if (!response[i].submenu) {
            let a = document.createElement("a");
            a.href = "#";
            let li = document.createElement("li");
            li.className = "dropdown-submenu";           
            li.appendChild(a);
            
          }

        }
        //creamos las ul
        //var level = response[response.length - 1].level;
        //for (let lvl = 1; lvl <= response.level; lvl++) {
        //  let ul = document.createElement("ul");
        //  ul.className = "dropdown-menu";
        //  ul.id = "ul " + lvl.toString();
        //  let aux = document.getElementById("ul 0");
        //  aux.appendChild(ul);
        //}

        ////creamos las li
        //for (let lvl = 0; lvl < response.length; lvl++) {
        //  let a = document.createElement("a");
        //  a.href = "#";
        //  let li = document.createElement("li");         
        //  ul.className = "dropdown-menu";
        //  ul.id = "ul " + lvl.toString();
        //  let aux = document.getElementById("ul 0");
        //  aux.appendChild(ul);
        //}

        //for (let i = 0; response.length; i++)
        //{

        //  const p = document.createElement("li");
        //  for (let x = 0; response.length; x++) {
        //    if (response[i].identifier == response[x].parent_Identifier)
        //    {

        //    }
        //  }

        //} 

      },
      error => { console.log("error al obtener categorías"); }
      )   
    
  }
  
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
