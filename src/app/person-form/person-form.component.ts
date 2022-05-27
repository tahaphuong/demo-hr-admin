import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../Person';
import { PersonService } from '../person-service/person.service';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  @Output() onReload: EventEmitter<any> = new EventEmitter();

  person: Person = {
    id: 0,
    firstname: "",
    surname: "",
    email: ""
  };

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  savePerson(): void {
    if (this.validate()) {
      this.person.id = new Date().getTime();
      this.personService.addPerson(this.person).subscribe(() => {
        this.person.firstname = "";
        this.person.surname = "";
        this.person.email = "";

        this.onReload.emit()
      })
    }
  }

  validate(): Boolean {
    console.log(this.person)
    if (this.person.firstname.trim().length == 0)
      return false;
    if (this.person.surname.trim().length == 0)
      return false;
    if (this.person.email.trim().length == 0)
      return false;
    return true
  }

}
