import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../Person';
import { PersonService } from '../person-service/person.service';

const DUMMY_PERSON = {
  id: 0,
  firstname: "",
  surname: "",
  email: "",
}

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})

export class PersonDetailComponent implements OnInit {
  editMode = false;
  @Input() person?: Person;
  @Output() onReload: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  
  editingPerson = DUMMY_PERSON

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.setInputValue();
  }

  setInputValue() {
    this.editingPerson.firstname = this.person?.firstname ?? "";
    this.editingPerson.surname = this.person?.surname ?? "";
    this.editingPerson.email = this.person?.email ?? "";
  }

  deletePerson(): void {  
    if (this.person) {
      let confirmation = confirm(`Delete person with id ${this.person.id}?`);
      if (confirmation) {
        this.personService.deletePerson(this.person.id).subscribe(() => {
          this.onReload.emit();
        })
      }
    }
  }

  savePerson(): void {
    if (this.editingPerson && this.person) {
      this.editingPerson.id = this.person.id;

      this.personService.updatePerson(this.editingPerson).subscribe(updatedPerson => {
        this.person = updatedPerson;
        this.editingPerson = DUMMY_PERSON;
        this.onUpdate.emit(updatedPerson);
      })
    }
  }

}
