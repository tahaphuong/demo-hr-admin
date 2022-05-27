import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../Person';
import { PersonService } from '../person-service/person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  editMode = false;
  @Input() person?: Person;
  @Input() getPeople?: Function; 
  @Output() onReload: EventEmitter<any> = new EventEmitter();
  
  editingPerson = {
    id: 0,
    firstname: "",
    surname: "",
    email: "",
  }

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.editingPerson.firstname = this.person?.firstname ?? ""
    this.editingPerson.surname = this.person?.surname ?? ""
    this.editingPerson.email = this.person?.email ?? ""
  }

  deletePerson(): void {  
    if (this.person) {
      let confirmation = confirm(`Delete person with id ${this.person.id}?`)
      if (confirmation) {
        this.personService.deletePerson(this.person.id).subscribe()
      }
    }
  }

  savePerson(): void {
    if (this.editingPerson && this.person) {
      this.editingPerson.id = this.person.id
      console.log(this.editingPerson)
      this.personService.updatePerson(this.editingPerson).subscribe(

      )
      //.subscribe(() => this.goBack());
    }
  }

}
