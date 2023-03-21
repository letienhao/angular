import { Filter, FilterButton } from './../../models/featuring.models';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
   filterButton : FilterButton[] =[
    {
      type : Filter.All,
      label: 'All',
      isActive : true
    },
    {
      type : Filter.Active,
      label: "Active",
      isActive: false
    },
    {
      type : Filter.Complete,
      label: "Complete",
      isActive: false
    }
   ]
   length : number = 0
}
